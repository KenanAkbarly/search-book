import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import style from'./style.module.scss'
import { BsSearch } from 'react-icons/bs';
import { IoMdCloseCircle } from 'react-icons/io';
import axios from 'axios';
const TopBody = styled.div`
    background-image: url('https://dadabooksearch.netlify.app/images/headerbg.jpg');
    height: 350px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
`
const SearchBody = styled.div`
    width: 55%;
    /* background-color: red; */
    height: 200px;
    padding: 10px 20px;
`
const H1 = styled.h1`
    font-size: 60px;
    color: white;
    font-weight: 700;
    text-align: center;
`
const Search = styled.div`
    margin-top: 20px;
    width: 100%;
    height: 60px;
    background-color: white;
    border-radius: 5px;
    box-shadow: rgba(255, 255, 255, 0.8) 0px 5px 15px;
    transition: all 0.3s ease;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px;
    &:hover{
        box-shadow: none;
    }
    &:active{
        box-shadow: none;
    }
    `
const Input = styled.input`
  width:95%;
  height: 50px;
  border: none;
  font-size: 22px;
  &:focus{
    outline: none;
  }
  ::placeholder{
    font-size: 20px;
  }
`
const Container = styled.div`
    width: 1000px;
    margin: 0 auto;
`
const Cards = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    margin: 15px;
    margin-top: 30px;

`
const CardItem = styled.div`
    width: 280px;
    background-color: white;
    padding: 15px 10px;
    border-radius: 5px;
    box-shadow: rgb(90 90 90 / 54%) 0px 3px 8px;
`
const Image = styled.img`
    width: 95%;
    height: 200px;
    margin-left: auto;
    margin-right: auto;
    object-fit: contain;
    padding-bottom: 15px;
    border-bottom: 1px solid rgb(220, 220, 220);
`
const H5 = styled.h5`
    margin-block-end: 1.67em;
    font-weight: bold;
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
`
const H6 = styled.h6`
       /* margin-top: 10px; */
    /* padding-bottom: 15px; */
    display: inline-block;
    border-top: 1px solid rgb(220, 220, 220);
    padding: 10px 5px 5px;
    font-size: 18px;
    opacity: 0.7;
    display: block;
    text-align: center;

`
const Preview = styled.a`
        display: inline-block;
    text-decoration: none;
    color: rgb(120, 120, 120);
    margin: 10px;
    transition: all 0.3s ease 0s;
    font-size: 18px;
    cursor: pointer;
    text-align: left;
`
const Details = styled.a`
        display: inline-block;
    text-decoration: none;
    color: rgb(120, 120, 120);
    margin: 10px;
    transition: all 0.3s ease 0s;
    font-size: 18px;
    cursor: pointer;
    text-align: right;
    &:hover{
        cursor: pointer;
    }
`
const Home = () => {
    //Submit and Search 
    const [input,setInput] = useState('')
    const inputChange = (e)=>{
        setInput(e.target.value)
    }
    const handleSumbit = (e)=>{
      e.preventDefault()
      getItems()
    }  
    // Fetch Data
    const [data,setData] = useState([])
    let BASE_URL = `https://www.googleapis.com/books/v1/volumes`;

  const getItems = async () => {
    const result = await axios.get(`${BASE_URL}?q=${input}&maxResults=40`);
    setData(result.data);
  };

  //Modal
  const [isOpen, setIsOpen] = useState(false);
  const [modal,setModal] = useState({})
  return (
    <div className={style.home_body}>
    <TopBody>
        <SearchBody>
            <form onSubmit={handleSumbit}>
            <H1>Book Searching App</H1>
            <Search>
            <Input type={'search'} value={input} onChange={inputChange} placeholder='Find Book' />
            <BsSearch style={{fontSize:'28px'}}/>
            </Search>
            </form>
        </SearchBody>
    </TopBody>
    <Container>
        <Cards>
            {
                data.items &&data.items.map((book,index)=>{
                    return(

                <CardItem key={index}>
                <Image src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`} />
                <H5>{book.volumeInfo.title}</H5>
                <H6>J.K.Rowling</H6>
                <div style={{
                    display:'flex',justifyContent:'center',width:'100%'}}>
                <Preview><a href={book.volumeInfo?.previewLink} target='_blank'>Preview</a></Preview>
                <Details onClick={()=>{
                    axios.get(`${BASE_URL}/${book.id}`).then((res)=>{
                        setModal(res.data)
                        console.log(res.data);
                        setIsOpen(true)
                    })
                }} >Details</Details>
                </div>
            </CardItem>
                    )
                })
            }
            
           
        </Cards>
    </Container>
    <>
    <div className={style.modal} style = {{visibility:isOpen === false?'hidden':'visible'}}>
        <div className={style.modal_top}>
            <button onClick={()=>{setIsOpen(false)}}><IoMdCloseCircle style={{fontSize:'25px',color:'red'}}/></button>
        </div>
        <div className={style.modal_bottom}>
        <div className={style.modal_bottom_left}>
            <img src={modal.volumeInfo?.imageLinks.thumbnail} alt="" />
        </div>
        <div className={style.modal_bottom_right}>
            <h2>{modal.volumeInfo?.title}</h2>
            <p>({modal.volumeInfo?.publishedDate})</p>
            <span>{modal.volumeInfo?.authors[0]}</span>
            <div>{modal.volumeInfo?.description}</div>
        </div>
        

        </div>
    </div>
    
    </>
    </div>
  )
}

export default Home
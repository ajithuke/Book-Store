import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const BookDetailPage = ()=>{

    const params = useParams()
    const firebase = useFirebase()

    const [book,setBook] = useState(null)
    const [url,setURL] = useState(null)
    const [qty,setQty]  =useState(1)

    useEffect(()=>{
        firebase.getBookById(params.bookId).then((book)=>{setBook(book.data())})
    },[])

    useEffect(()=>{
        if(book){
            const imageURL = book.imageURL
            firebase.getImageURL(imageURL).then((url)=>{setURL(url)})
        }
    },[book])

    const placeOrder = ()=>{
        firebase.PlaceOrder(params.bookId,qty).then((snap)=>{console.log('success')})
    }

    if(!book){
        return <h1>Loading...</h1>
    }

    return (
        <div className="containr" style={{marginLeft:"100px"}}>
            <h2>{book.name}</h2>
            <img src={url} style={{marginTop:'10px'}} />
            <h3 style={{marginTop:'10px'}}>Details</h3>
            <h6>Price: {book.price}</h6>
            <h6>ISBN Number : {book.ISBN}</h6>
            <h6>Author Name : {book.Author}</h6>
            <h6>Author Email : {book.userEmail}</h6>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Enter Quantity</Form.Label>
                    <Form.Control 
                        value={qty}
                        onChange={(e)=>{setQty(e.target.value)}}
                        type="Number"
                        placeholder="Quantity" 
                    />
                </Form.Group>
            <Button onClick={placeOrder}>Buy Now</Button>
        </div>
    )
}

export default BookDetailPage
import React,{useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

const BookCard = (props)=>{

    const firebase = useFirebase()
    const  [url,setURL] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        firebase.getImageURL(props.imageURL).then((url)=>{setURL(url)})
    },[])

    return (
         <Card style={{ width:'18rem',margin:'40px' }}>
            <Card.Img variant="top" src={url} style={{ height: '18rem' }} />
            <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>
                Author of this book is Mr. {props.Author} and price of this book is Rs.{props.price}
            </Card.Text>
            <Button onClick={(e)=>{navigate(props.link)}} variant="primary">{props.btntitle}</Button>
            </Card.Body>
        </Card>
    )
}

export default BookCard
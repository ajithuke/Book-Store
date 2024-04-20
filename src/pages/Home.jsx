import React,{useEffect,useState} from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from '../components/Card'
import CardGroup from 'react-bootstrap/CardGroup';

const HomePage = ()=>{

    const firebase = useFirebase()
    const [books,setBooks] = useState([])

    useEffect(()=>{
        firebase.listAllBooks().then((books)=>{setBooks(books.docs)})
    },[])

    return (
        <div className="container">
        <CardGroup>
            {books.map((book)=>(
                <BookCard key={book.id} bookId={book.id} {...book.data()} />
            ))}
        </CardGroup>
        </div>
    )
}

export default HomePage
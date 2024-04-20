import React,{useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFirebase } from "../context/Firebase";

const ListingPage = ()=>{

    const firebase = useFirebase()

    const [name,setName] = useState("")
    const [author,setAuthor] = useState("")
    const [isbn,setIsbn] = useState("")
    const [price,setPrice] = useState("")
    const [cover,setCover] = useState("")

    const handleSubmit =async (e)=>{
        e.preventDefault()
        await firebase.createNewList(name,author,isbn,price,cover).then((snap)=>{
            console.log("success")
            setName("")
            setAuthor("")
            setIsbn("")
            setPrice("")
            setCover("")
        })
    }

    return (
        <div className="container">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mt-4 mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter Book Name</Form.Label>
                    <Form.Control 
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                        type="text" 
                        placeholder="Book Name" 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Author Name</Form.Label>
                    <Form.Control 
                        value={author}
                        onChange={(e)=>{setAuthor(e.target.value)}}
                        type="text" 
                        placeholder="author Name" 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Enter Price</Form.Label>
                    <Form.Control 
                        value={price}
                        onChange={(e)=>{setPrice(e.target.value)}}
                        type="text" 
                        placeholder="Price" 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Enter ISBN Number</Form.Label>
                    <Form.Control 
                        value={isbn}
                        onChange={(e)=>{setIsbn(e.target.value)}}
                        type="text" 
                        placeholder="ISBN Number" 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Cover Photo</Form.Label>
                    <Form.Control 
                        onChange={(e)=>{setCover(e.target.files[0])}}
                        type="file"
                    />
                </Form.Group>
      
                <Button variant="primary" type="submit" className="mt-3">
                    Add Book
                </Button>
            </Form>
        </div>
    )
}

export default ListingPage
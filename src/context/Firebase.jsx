import React, { useState,useEffect,createContext,useContext } from "react";
import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,onAuthStateChanged} from 'firebase/auth'
import {getFirestore,collection,addDoc,getDocs,doc,getDoc} from 'firebase/firestore'
import {getStorage,uploadBytes,ref,getDownloadURL} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBhZ0wUQIHEQv54XaeMTm7Q-pZhV4omWxI",
  authDomain: "book-management-6bd41.firebaseapp.com",
  projectId: "book-management-6bd41",
  storageBucket: "book-management-6bd41.appspot.com",
  messagingSenderId: "443381756841",
  appId: "1:443381756841:web:e4da5b8196978ed7998ab8"
};

const FirebaseContext = createContext(null)
export const useFirebase = () => useContext(FirebaseContext);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(app)
const storage = getStorage(app)

const FirebaseProvider = (props)=>{

    const [user,setUser] = useState(null)

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setUser(user)
            }else{
                setUser(null)
            }
        })
    },[])

    const signUpUserWithEmailAndPassword = (email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const  logInUser = (email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }

    const signInWithGoogle = ()=>{
        return signInWithPopup(auth,googleProvider)
    }

    const createNewList =async (name,author,isbn,price,cover)=>{
        const imageRef = ref(storage,`upload/images/${cover.name}}`)
        const uploadResult = await uploadBytes(imageRef,cover)

        return await addDoc(collection(firestore,'books'),{
            name,
            Author:author,
            price:Number(price),
            ISBN:Number(isbn),
            imageURL:uploadResult.ref.fullPath,
            userID:user.uid,
            userEmail:user.email
        })
    }

    const listAllBooks =async ()=>{
        return await getDocs(collection(firestore,"books"))
    }

    const getBookById =async (bookId)=>{
        const docRef = doc(firestore,"books",bookId)
        const result = await getDoc(docRef)
        return result
    }

    const getImageURL =async (path)=>{
        return await getDownloadURL(ref(storage,path))
    }

    const PlaceOrder =async (bookId,qty)=>{
        const collectionRef = collection(firestore,"books",bookId,"orders")
        const result = await addDoc(collectionRef,{
            Email:user.email,
            userId:user.uid,
            Quantity:Number(qty)
        })
        return result
    }

    const isLoggedIn = user ? true : false ;
    
    return (
        <FirebaseContext.Provider 
            value={{signUpUserWithEmailAndPassword,logInUser,signInWithGoogle,createNewList,listAllBooks,getImageURL,getBookById,PlaceOrder,isLoggedIn}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseProvider
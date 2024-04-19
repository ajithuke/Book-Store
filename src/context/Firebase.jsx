import React, { useState,useEffect,createContext,useContext } from "react";
import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,onAuthStateChanged} from 'firebase/auth'

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

    const isLoggedIn = user ? true : false ;
    
    return (
        <FirebaseContext.Provider 
            value={{signUpUserWithEmailAndPassword,logInUser,signInWithGoogle,isLoggedIn}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseProvider
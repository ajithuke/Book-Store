import React, { createContext,useContext } from "react";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBhZ0wUQIHEQv54XaeMTm7Q-pZhV4omWxI",
  authDomain: "book-management-6bd41.firebaseapp.com",
  projectId: "book-management-6bd41",
  storageBucket: "book-management-6bd41.appspot.com",
  messagingSenderId: "443381756841",
  appId: "1:443381756841:web:e4da5b8196978ed7998ab8"
};

const app = initializeApp(firebaseConfig);

const FirebaseContext = createContext(null)
export const useFirebase = ()=>{useContext(FirebaseContext)}

const FirebaseProvider = (props)=>{

    return (
        <FirebaseContext.Provider>
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseProvider
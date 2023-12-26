import React, { useState } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth,storage } from "../firebase.js"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"


export default function Register() {
    
    const [error,setError] = useState(false)
    const handleSubmit = async (e) =>{
        e.preventDefault()

        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const imgFile = e.target[3].files[0];

        try{
            const res = await createUserWithEmailAndPassword(auth, email, password)
            
            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
            (error) => {
               setError(true)
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                await updateProfile(res.user,{
                    displayName,
                    photoURL:downloadURL
                });
                });
            }
            );

            await setDoc(doc(db,"Users",res.user.uid),{
                
            })
        }catch(error){
            setError(true)
        }

    }
    
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Capstone</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name"/>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <input style={{display:"none"}}type="file" id="imagefile"/>
                        <label htmlFor="imagefile">
                            <img src="src\assets\addAvatar.png" alt="" />
                            <span>Add an image</span>
                        </label>
                    <button>Sign Up</button>
                    {error && <span>Some error occured!</span>}
                </form>
                <p>Already have an account?Sign in</p>
            </div>
        </div>
    )
}
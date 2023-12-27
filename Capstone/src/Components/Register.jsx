import React, { useState } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth,storage,db } from "../firebase.js"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"
import { Link } from "react-router-dom";


export default function Register() {
    
    const [error,setError] = useState(false)
    const handleSubmit = async (e) =>{
        e.preventDefault()

        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const imgFile = e.target[3].files[0];
        
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            const user = userCredential.user;
            console.log(user)
        })
        .catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message
        })
        // try{
        //     createUserWithEmailAndPassword(auth, email, password)
        // //     const res = await createUserWithEmailAndPassword(auth, email, password)
        // //     console.log(res.user);
        // //     const storageRef = ref(storage,`${displayName}`);

        // //     const uploadTask = uploadBytesResumable(storageRef, imgFile);

        // //     uploadTask.on(
        // //     (error) => {
        // //        setError(true);
        // //     }, 
        // //     () => {
        // //         getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        // //         await updateProfile(res.user,{
        // //             displayName,
        // //             photoURL:downloadURL
        // //         });
        // //         await setDoc(doc(db,"users",res.user.uid),{
        // //             uid:res.user.uid,
        // //             displayName,
        // //             email,
        // //             photoURL:downloadURL,
        // //         });
        // //     });
        // // }
        // // );    
        // }catch(error){
        //     console.log(error)
        //     setError(true);
        // }

    };
    
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
                    <button>
                        <Link style={{textDecoration:"none"}} to="/">Sign Up</Link>
                    </button>
                    {error && <span>Some error occured!</span>}
                </form>
                <p>Already have an account?<Link style={{textDecoration:"none"}} to="/Login"> Sign in</Link></p>
            </div>
        </div>
    )
}
import './auth.css';
import {auth,googleProvider} from ".././firebase";
import React, { useState } from 'react';
import {createUserWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';


export const Auth=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate()


    const SignUp = async()=>{
        try{
            console.log("Clicked")
            let eey=await createUserWithEmailAndPassword(auth, email, password);
            navigate("/weather")

        } catch(err){
            console.error(err);
        }
    };

    const signInWithGoogle = async()=>{
        try{
            await signInWithPopup(auth, googleProvider);
            navigate("/weather")
        } catch(err){
            console.error(err);
        }
    };

    return(
        <div>
        <h1>Weather Daily By Sophie</h1> 
            <input placeholder="Email..." onChange={(e)=>setEmail(e.target.value)}/>
            <input placeholder="Password..." type="password" onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={()=>{SignUp()}}>Sign Up</button>

            <button onClick={signInWithGoogle}>Continue With Google</button>
            <p>
                        Already have an account?{' '}
                        <NavLink to="/login" >
                            Sign in
                        </NavLink>
                    </p>       
        </div>
    );
};
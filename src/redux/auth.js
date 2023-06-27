import { createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../config/firebase";
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const authSlice = createSlice({
    name: 'auth',
    
    initialState: {currentUser: null},

    reducers: {
        signinWithEmail: async (state, action) => {
            try{
                const {email, password} = action.payload
                const userCred = await signInWithEmailAndPassword(auth, email, password);
                state.currentUser = userCred.user;
            }catch(error){
                console.log(error)
            }
        },

        signinWithGoogle: async (state) => {
            try{
                const userCred = await signInWithPopup(auth, new GoogleAuthProvider())
                state.currentUser = userCred.user;
            }catch(error){
                console.log(error)
            }
          
            
        },

        signup: async (state, action) => {
            try{
                const {email, password, fullName} = action.payload
                const newUser = await createUserWithEmailAndPassword(auth, email, password)
                const userRef = doc(db, "users", newUser.user.uid)
                await updateProfile(newUser.user, {displayName: fullName})
                await setDoc(userRef, {
                    fullName: fullName,
                    email: email,
                    createdAt: serverTimestamp(),
                });
                // state.currentUser = newUser.user;
            }catch(error){
                console.log(error)
            }

        },
        signout: async (state) => {
            await signOut(auth);
            state.currentUser = null;
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        }
        
    }
})



export const {signinWithEmail, signinWithGoogle, signup, signout, setCurrentUser} = authSlice.actions;
export default authSlice.reducer;
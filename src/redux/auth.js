import { createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../config/firebase";
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, sendPasswordResetEmail, onAuthStateChanged} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
// import { useDispatch } from "react-redux";

// const dispatch = useDispatch();

const authSlice = createSlice({
    name: 'auth',
    
    initialState: {
        currentUser: null
    },

    reducers: {
        signinWithEmail: async (state, action) => {
            try{
                
                const {email, password} = action.payload
                const userCred = await signInWithEmailAndPassword(auth, email, password);
                console.log("+++++++++++++++++++++++++++++",userCred.user)
                // state.currentUser = setCurrentUser(userCred.user);
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
                // state.currentUser = setCurrentUser(newUser.user);
            }catch(error){
                console.log(error)
            }

        },
        signout: async (state) => {
            await signOut(auth);
            state.currentUser = null;
        },

        resetPassword: async (state, action) => {
            try{
                const {email} = action.payload
                await sendPasswordResetEmail(auth, email)
            }catch(error){
                console.log(error)
            }
        },


        setCurrentUser: (state, action) => {
            if (!action.payload) {
                state.currentUser = null;
                return;
            }
            const {displayName, email, uid, photoURL} = action.payload;
            state.currentUser = {displayName: displayName, email:email, uid: uid, photoURL:photoURL};
        }
        
    }
})


export const listenForAuthChanges = () => (dispatch) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setCurrentUser(user));
      } else {
        dispatch(setCurrentUser(null));
      }
    });
  };

export const {signinWithEmail, signinWithGoogle, signup, signout, setCurrentUser, resetPassword} = authSlice.actions;
export default authSlice.reducer;
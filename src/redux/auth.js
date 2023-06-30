import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../config/firebase";
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, sendPasswordResetEmail} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

// This is a thunk, that login user with email and password
export const signinWithEmail =  createAsyncThunk(
    "auth/signinWithEmail", 
    async (payload) => {
        const {email, password} = payload
        await signInWithEmailAndPassword(auth, email, password);   
    }
)

// This is a thunk, that login user with google
export const signinWithGoogle = createAsyncThunk(
    "auth/signinWithGoogle",
    async () => {
        await signInWithPopup(auth, new GoogleAuthProvider())
    }
)

// This is a thunk, that signup user with email,password, and fullName 
// Changes can be made to sign up by providing full details of the user
export const signup =  createAsyncThunk(
    "auth/signup", 
    async (payload) => {
        const {email, password, fullName} = payload
        const newUser = await createUserWithEmailAndPassword(auth, email, password)
        const userRef = doc(db, "users", newUser.user.uid)
        await updateProfile(newUser.user, {displayName: fullName})
        await setDoc(userRef, {
            fullName: fullName,
            email: email,
            createdAt: serverTimestamp(),
        })

})

// This is a thunk, that signout user
export const signout = createAsyncThunk(
    "auth/signout",
    async () => {
        await signOut(auth)
    }
)


// This is a thunk, that reset password
export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async (payload) => {
        const {email} = payload
        await sendPasswordResetEmail(auth, email)
    }
)



const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null,
        authStatus: 'idle',
        authError: null,
    },

    reducers: {
        setCurrentUser: (state, action) => {
            const user = action.payload;
            state.currentUser = user ? user: null;
        }
        
    },

    extraReducers: (builder) =>{
        builder
            .addCase(signinWithEmail.pending, (state) => {
                state.authStatus = 'loading';
                state.authError = null;
            })
            .addCase(signinWithEmail.fulfilled, (state) => {
                // state.currentUser = action.payload;
                state.authStatus = 'succeeded';
            })
            .addCase(signinWithEmail.rejected, (state, action) => {
                console.log(action.error.message)
                state.authStatus = 'failed';
                state.authError = action.error.message;
            })




            .addCase(signup.pending, (state) => {
                state.authStatus = 'loading';
                state.authError = null;
            })
            .addCase(signup.fulfilled, (state) => {
                state.authStatus = 'succeeded';
            })
            .addCase(signup.rejected, (state, action) => {
                state.authStatus = 'failed';
                state.authError = action.error.message;
            })
            



            .addCase(signinWithGoogle.pending, (state, action) => {
                state.authStatus = 'loading';
                state.authError = action.error.message;
                })
            .addCase(signinWithGoogle.fulfilled, (state) => {
                state.authStatus = 'succeeded';
            })
            .addCase(signinWithGoogle.rejected, (state, action) => {
                state.authStatus = 'failed';
                state.authError = action.error.message;
            })




            .addCase(signout.pending, (state) => {
                state.authStatus = 'loading';
                state.authError = null;
            })
            .addCase(signout.fulfilled, (state) => {
                state.authStatus = 'idle';
            })
            .addCase(signout.rejected, (state, action) => {
                state.authStatus = 'failed';
                state.authError = action.error.message;
            })



            .addCase(resetPassword.pending, (state) => {
                state.authStatus = 'loading';
                state.authError = null;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.authStatus = 'idle';
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.authStatus = 'failed';
                state.authError = action.error.message;
            })

    }
})




export const listenForAuthChanges = () => (dispatch) => {
    auth.onAuthStateChanged((user) => {
        user = user ? {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
        } : null;
        dispatch(setCurrentUser(user));
    });
  };


export const {setCurrentUser} = authSlice.actions;
export default authSlice.reducer;
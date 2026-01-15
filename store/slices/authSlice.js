import {createSlice} from '@reduxjs/toolkit';
import { registerUser, userLogin, getProfile, userLogout  } from '../action/authActions';


const initialState = {
    loading: false,
    userInfo: typeof window !== 'undefined' && localStorage.getItem('user-info')
    ? JSON.parse(localStorage.getItem('user-info'))
    : null,
    //userInfo: localStorage.getItem('user-info')? JSON.parse(localStorage.getItem('user-info')) : null, 
    //userToken: null, // for storing the JWT
    userProfile:null,
    error: null,
    success: false,
    loginResponse: false,
    signUpResponse:null,
    logoutResponse:null,
    forgotPasswordResponse:null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setUser: (state, action) => {
      state.userInfo = action.payload;
      },

      // Universal reset for auth-related state
      resetLoginData: (state) => {
         state.loading = false;
         state.success = false;
         state.error = null;
         state.userInfo = null;
         state.userProfile = null;
         state.loginResponse = false;
         state.signUpResponse = null;
         state.logoutResponse = null;
         state.forgotPasswordResponse = null;
      },

    },
    extraReducers: (builder) =>  {
         // login user
         builder
          .addCase(userLogin.pending, (state, action) => {
            state.loading = true
            state.error = null
          })
          .addCase(userLogin.fulfilled, (state, action) => {
            state.loading = false
            state.userInfo = action.payload
            state.loginResponse = true
            //state.userToken = payload.userToken
          })
          .addCase(userLogin.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
          });

          // Register user
         builder
         .addCase(registerUser.pending, (state, action) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
            state.success = true;
         })
         .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         });

         // getProfile User
         builder
         .addCase(getProfile.pending, (state, action) => {
            state.loading = true
            state.error = null
         })
         .addCase(getProfile.fulfilled, (state, action) => {
            state.loading = false
            state.userProfile = action.payload
         })
         .addCase(getProfile.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         });

         // Logout User
       builder
          .addCase(userLogout.pending, (state) => {
             state.loading = true;
             state.error = null;
          })

          .addCase(userLogout.fulfilled, (state, action) => {
             state.loading = false;
             state.userInfo = null;
             state.error = null;
             state.logoutResponse = action.payload;
          })

          .addCase(userLogout.rejected, (state, action) => {
             state.loading = false;
             state.error = action.payload || "Logout failed";
          });

    },
})

export const { setUser, resetLoginData } = authSlice.actions;

export default authSlice.reducer;

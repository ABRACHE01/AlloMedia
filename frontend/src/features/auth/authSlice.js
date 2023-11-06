import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'




const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isAuth : JSON.parse(localStorage.getItem('isAuth'))|| null,
  message: '',
};
  //Register user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
       const response = await authService.register(user);
      return response;

    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    const response = await authService.login(user)
    return response;

  
  } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message)
  }
})

//logout
export const logout = createAsyncThunk("auth/logout", async ( thunkAPI) => {
  try {
    const response = await authService.logout();
    return response;
    
  } catch (error) {
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message)
  }
});

//forget password 
export const sendEmforgetPass = createAsyncThunk("auth/sendEmforgetPass", async(user, thunkAPI)=>{
    try{

      const response = await authService.sendEmforgetPass(user)
      return response;
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message)
    }
})

export const resetForgottenPass = createAsyncThunk("auth/resetForgottenPass", async(user , thunkAPI)=>{
  try{

    const response =await authService.resetForgottenPass(user)
    return response 
  } catch (error) {
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message)
  }
})

//reset password 
export const sendEmResetPass = createAsyncThunk("user/role/sendEmResetPass", async(role , thunkAPI)=>{
  
  try{
    const response = await authService.sendEmResetPass(role)
    return response;
  } catch (error) {
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message)
  }
})

export const resetLogedPass = createAsyncThunk("user/role/resetLogedPass", async(user , thunkAPI)=>{
  try{

    const response = await authService.resetLogedPass(user)
    return response 
  } catch (error) {
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message)
  }
})


  
  export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.message = '';
      },
    },
    extraReducers: (builder) => {

      builder
        .addCase(register.pending, (state) => {
          state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.message = action.payload 
        })
        .addCase(register.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })



        .addCase(login.pending, (state) => {
            state.isLoading = true
          })

          .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload
            state.isAuth= JSON.parse(localStorage.getItem('isAuth'));
            state.user = JSON.parse(localStorage.getItem('user'));
          })

          .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })


          .addCase(logout.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(logout.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
            state.isAuth= false;
            state.user = null;
          })
          .addCase(logout.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          })


          .addCase(sendEmforgetPass.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(sendEmforgetPass.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload; 
          })
          .addCase(sendEmforgetPass.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          })
          
          .addCase(resetForgottenPass.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(resetForgottenPass.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload; 
          })
          .addCase(resetForgottenPass.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          })


          .addCase(sendEmResetPass.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(sendEmResetPass.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload; 
          })
          
          .addCase(sendEmResetPass.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          })

          .addCase(resetLogedPass.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(resetLogedPass.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload; 
          })
          .addCase(resetLogedPass.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          })

          

    },
  })
  
  export const { reset } = authSlice.actions
  export default authSlice.reducer
  
  
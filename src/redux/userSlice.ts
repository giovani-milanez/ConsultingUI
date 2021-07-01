import { createSlice, PayloadAction  } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface UserState {
  accessToken: string,
  refreshToken: string
}

const initialState: UserState = {
  accessToken: '',
  refreshToken: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      state.accessToken = '';
      state.refreshToken = '';
    },
    login: (state, action: PayloadAction<UserState>) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    }
  }
})

// Action creators are generated for each case reducer function
export const { logout, login } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const getToken = (state: RootState) => state.user.accessToken

export default userSlice.reducer
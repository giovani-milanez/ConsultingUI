import { createSlice, PayloadAction  } from '@reduxjs/toolkit'
import type { RootState } from './store'

type UserInfo = {
  readonly id: number;
  readonly isConsultant: boolean;
  readonly name: string;
  readonly email: string;
  readonly rateMeanStars: number;
  readonly rateCount: number;
  readonly profilePicUrl: string;
}

type UserState = {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly expiration: string;
  readonly info: UserInfo;
}


const initialState: UserState = {
  accessToken: '',
  refreshToken: '',
  expiration: '',
  info: {
    id: 0,
    isConsultant: false,
    name: '',
    email: '',
    rateMeanStars: 0,
    rateCount: 0,
    profilePicUrl: ''
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      state.accessToken = '';
      state.refreshToken = '';
      state.expiration = '';
      state.info = { id: 0, isConsultant: false, name: '', email: '',  rateMeanStars: 0, rateCount: 0, profilePicUrl: ''}
    },
    login: (state, action: PayloadAction<UserState>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.expiration = action.payload.expiration;
      state.info = action.payload.info;
    }
  }
})

// Action creators are generated for each case reducer function
export const { logout, login } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const isConsultant = (state: RootState) => state.user.info.isConsultant
export const isLoggedIn = (state: RootState) => state.user.accessToken ? true : false
export const firstName = (state: RootState) => state.user.info.name.indexOf(' ') !== -1 ? state.user.info.name.split(' ').slice(0, -1).join(' ') : state.user.info.name

export default userSlice.reducer
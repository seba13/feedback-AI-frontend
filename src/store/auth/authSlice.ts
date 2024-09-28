import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginUserResult } from "../../auth/interface/LoginUserResult";

type Status<T = "checking" | "not-authenticated" | "authenticated"> = T;

type InitialAuth<
  O extends string | null = string | null,
  T extends string = "checking" | "not-authenticated" | "authenticated",
  K extends string | null = string | null,
  M extends string | null = string | null,
  N extends string | null = string | null
> = {
  accessToken: O;
  status: Status<T>;
  email: K;
  errorMessage: M;
  errorCode: N;
};

const initialState: InitialAuth = {
  accessToken: null,
  status: "checking",
  email: null,
  errorMessage: null,
  errorCode: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginUserResult>) => {
      state.accessToken = action.payload.token;
      state.status = "authenticated";
      state.errorMessage = null;
      state.errorCode = null;
      state.email = action.payload.email;
    },

    logout: (state, action: PayloadAction<LoginUserResult>) => {
      state.accessToken = null;
      state.status = "not-authenticated";
      state.email = null;
      state.errorMessage = action.payload?.errorMessage || null;
      state.errorCode = action.payload?.errorCode || null;
    },

    setAccessToken: (
      state,
      action: PayloadAction<Pick<LoginUserResult, "token">>
    ) => {
      console.log("setAccessToken");

      console.log(action.payload.token);

      state.accessToken = action.payload.token;
    },

    checkingCredentials: (state) => {
      state.status = "checking";
    },
  },
});

export const { login, logout, checkingCredentials, setAccessToken } =
  authSlice.actions;

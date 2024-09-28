import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import {
  obtenerAccessToken,
  startLoginWithAccessToken,
} from "../store/auth/thunks";

export const useCheckAuth = () => {
  // recibe el usuario desde la autenticacion

  // "checking" | "not-authenticated" | "authenticated"
  const { status, accessToken, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(obtenerAccessToken());
  }, [dispatch]);

  useEffect(() => {
    if (accessToken && status !== "authenticated") {
      console.log({ accessToken });
      dispatch(startLoginWithAccessToken(accessToken));
    }

    //
    //
    //
    // TODO:
    // PETICION AL REFRESH TOKEN (SI ES QUE ESTÁ EL REFRESH Y ES VÁLIDO)
    // VALIDA SI EL REFRESH TOKEN NO HA EXPIRADO, SI ES VALIDO DEVUELVE UN ACCESS TOKEN
    // ACCESS_TOKEN <= FETCH(/auth/refresh, {credentials: 'include'})
    // SE ALMACENA EL TOKEN EN STORE
    // DISPATCH LOGIN
    //
    //
    //
    // SI !REFRESH_TOKEN || REFRESH_TOKEN EXPIRO => LOGOUT
    //            THUNKS FETCH
    //
    // TODO:
    //
    // ANTES DE ALGUNA PETICION PRIVADA SE VALIDA SI EL ACCESS_TOKEN Y EL REFRESH_TOKEN NO HAN EXPIRADO
    // SI EXPIRÓ EL REFRESH TOKEN => DISPATCH LOGOUT
    // SI EXPIRÓ EL ACCESS TOKEN => SOLICITAR NUEVO TOKEN A TRAVÉS DE REFRESH TOKEN
    //
    //
    //
    //
    //
    // TODO:
    // SI EL REFRESH TOKEN EXPIRÓ
    // DISPATCH LOGOUT
  }, [accessToken]);
  return {
    status,
    errorMessage,
  };
};

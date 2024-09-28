import { LoginUserResult } from "../../auth/interface/LoginUserResult";
import { FetchMethods } from "../../ui/interface/FetchMethods";
import { AppDispatch } from "../store";
// import { checkingCredentials, login } from "./authSlice";
import {
  checkingCredentials,
  login,
  logout,
  setAccessToken,
} from "./authSlice";

// TODO: REFACTORIZAR BACKEND LOGIN GOOGLE
export const checkingAuthenticationWithGoogle = (code: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());

    // comprobar autenticacion

    // si hay error dispatch logout

    // const response = await fetch(
    //   `http://localhost:5000/auth/google?code=${code}`
    // );

    try {
      const response = await fetch("http://localhost:5005/auth/google", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor"); // Lanza un error si la respuesta no es 2xx
      }

      if (data.ok) {
        dispatch(login(data));
      } else {
        dispatch(logout(data as LoginUserResult));
      }
    } catch {
      dispatch(logout({} as LoginUserResult));
    }

    // if (data.ok) {
    //   dispatch(login(data));
    // }

    // dispatch login
  };
};

export const obtenerAccessToken = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(checkingCredentials());

      const response = await fetch("http://localhost:5005/auth/refresh", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor"); // Lanza un error si la respuesta no es 2xx
      }

      const data = await response.json();

      if (data.ok) {
        await dispatch(setAccessToken(data));
      } else {
        // REFRESH TOKEN INVÁLIDO

        dispatch(logout({} as LoginUserResult));
      }
    } catch {
      // REFRESH TOKEN INVÁLIDO o ENDPOINT INVÁLIDO

      dispatch(logout({} as LoginUserResult));
    }
  };
};

export const checkingAuthenticationEmailPassword = (
  email: string,
  password: string
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(checkingCredentials());

      const response = await fetch("http://localhost:5005/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.ok) {
        dispatch(login(data));
      } else {
        dispatch(logout(data as LoginUserResult));
      }
    } catch {
      // Error interno servidor no controlado
      // endpoint invalido
      dispatch(logout({ errorMessage: "Cannot login" } as LoginUserResult));
    }
  };
};

// TODO: POR IMPLEMENTAR
export const fetchWithCredentials = ({
  method,
  bodyData,
}: {
  method: FetchMethods;
  bodyData: Record<string, unknown>;
}) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(checkingCredentials());

      const response = await fetch("http://localhost:5005/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        method,
        body: JSON.stringify({ ...bodyData }),
      });

      const data = await response.json();

      return data;
    } catch {
      // Error interno servidor no controlado
      // endpoint invalido
      dispatch(
        logout({ errorMessage: "error with authorization" } as LoginUserResult)
      );
    }
  };
};

export const startLoginWithAccessToken = (accessToken: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(checkingCredentials());

      const response = await fetch("http://localhost:5005/auth/access-token", {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (data.ok) {
        dispatch(login(data));
      } else {
        // localStorage.removeItem("refresh_token");
        dispatch(logout({} as LoginUserResult));
      }
    } catch {
      // localStorage.removeItem("refresh_token");
      dispatch(logout({} as LoginUserResult));
    }
  };
};

export const startLogout = () => {
  return async (dispatch: AppDispatch) => {
    // localStorage.removeItem("refresh_token");

    // TODO: ELIMINAR COOKIE DE CLIENTE
    fetch("http://localhost:5005/auth/logout", {
      credentials: "include",
      method: "POST",
    });

    dispatch(logout({} as LoginUserResult));
  };
};

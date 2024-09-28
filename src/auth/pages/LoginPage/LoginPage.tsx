import { useDispatch, useSelector } from "react-redux";
import "../../../App.css";
// import { Form, FormItems } from "../../../ui/components/Form/Form";
import { AuthLayout } from "../../layout/AuthLayout";

import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import { AppDispatch, RootState } from "../../../store/store";
import {
  checkingAuthenticationEmailPassword,
  checkingAuthenticationWithGoogle,
} from "../../../store/auth/thunks";
import { ChangeEvent, FormEvent, useState } from "react";
import { checkingCredentials, logout } from "../../../store/auth/authSlice";
import { LoginUserResult } from "../../interface/LoginUserResult";
// import { useCheckAuth } from "../../../hooks/useCheckAuth";

export const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { errorMessage, status } = useSelector(
    (state: RootState) => state.auth
  );

  const responseGoogle = async (
    authResult:
      | Omit<CodeResponse, "error" | "error_description" | "error_uri">
      | Pick<CodeResponse, "error" | "error_description" | "error_uri">
  ) => {
    console.log({ authResult });
    if ("code" in authResult) {
      console.log(authResult.code);

      dispatch(checkingAuthenticationWithGoogle(authResult.code));
    } else {
      console.log("ac");
      dispatch(logout({} as LoginUserResult));
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  const onGoogleSignIn = () => {
    dispatch(checkingCredentials());

    googleLogin();
  };

  // const formItems: FormItems[] = [
  //   {
  //     label: "email",
  //     input: "email",
  //     value: "",
  //   },
  //   {
  //     label: "password",
  //     input: "password",
  //     value: "",
  //   },
  //   {
  //     input: "submit",
  //     value: "Login",
  //   },
  // ];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginWithEmailPassword = (e: FormEvent) => {
    e.preventDefault();

    if (email.trim().length > 0 && password.trim().length > 0) {
      dispatch(checkingAuthenticationEmailPassword(email, password));
    }
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <AuthLayout>
        <form
          onSubmit={loginWithEmailPassword}
          className="animate__animated animate__fadeIn"
        >
          <div>
            <label htmlFor="email">email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail((e.target as HTMLInputElement).value)
              }
            ></input>
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword((e.target as HTMLInputElement).value)
              }
            ></input>
          </div>
          {errorMessage && <p>{errorMessage}</p>}
          <br />
          <div>
            <button>Login</button>
          </div>
          <br />
        </form>

        <button disabled={status === "checking"} onClick={onGoogleSignIn}>
          Login with google
        </button>
      </AuthLayout>
    </div>
  );
};

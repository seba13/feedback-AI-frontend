import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { startLogout } from "../../../store/auth/thunks";

export const FeedbackPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const onLogout = () => {
    dispatch(startLogout());
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <h2>FeedbackPage</h2>
      <button onClick={onLogout}>logout</button>
    </div>
  );
};

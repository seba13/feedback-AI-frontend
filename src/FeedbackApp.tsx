import { Provider } from "react-redux";
import { FeedbackRouter } from "./router/FeedbackRouter";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <FeedbackRouter />
    </Provider>
  );
}

export default App;

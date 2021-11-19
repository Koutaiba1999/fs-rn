import React from "react";
import Index from "./src/Index";
import store from "./src/store/store";
import { Provider } from "react-redux";
function MainApp() {
  return <Index />;
}
const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};
export default App;
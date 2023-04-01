import Root from "./Root";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Main from "./context/main";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Main>
          <Root />
        </Main>
      </BrowserRouter>
    </div>
  );
}

export default App;

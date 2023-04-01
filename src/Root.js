import Play from "./Play/Play";
import Home from "./Home/Home";
import { Routes, Route} from "react-router-dom";
  const Root = () => {
  return (
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/play' element={<Play/>}/>
   </Routes>
)}
export default Root

import "./Home.css";
import { SiLichess } from "react-icons/si";
import { useState,useContext,useEffect } from "react";
import context from '../context/context'
import Modal from'./modal'
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
const Home = () => {
	let history=useNavigate()
	const {socket,token,setGame,online} = useContext(context)
  const [id, setId] = useState("");
  const [req, setReq] = useState({});
  let join = () => {
    if (id !== "") {
socket.emit('request',id)

    }
  };
  useEffect(()=>{
	socket.on('send',(res)=>{
setReq(res)
	})

	
  },[])
  
  useEffect(()=>{
     	socket.on('game',(res=>{
     		setGame(res)
     		console.log(res)
     		history('/play')
     	}))
     	
},[])	
  return (
	<>
	{online?
    <div className="Home">
      <div className="margin"></div>
      <div className="logo">
        <span>chess</span>
        <SiLichess />
      </div>
      <div className="myid">
        <span>id: {token}</span>
      </div>
      <input
        type="text"
        className="name"
        placeholder="enter your friend id"
        onChange={(e) => setId(e.target.value)}
      />
      <div className="btnHolder">
        <button className="btn" onClick={join}>
          send request
        </button>
      </div>
      {
	req.id?<Modal data={req} req={setReq}/>:''
      }
    </div>
:
<div className='loadingHolder'>
<AiOutlineLoading3Quarters 
className='loading'
size={50}
color='white'/>
<span>loading...</span>

</div>
	}
    </>
  );
};
export default Home;

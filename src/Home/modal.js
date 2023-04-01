import "./modal.css";
import context from '../context/context'
import { useState,useEffect,useContext} from "react";
const Modal = ({data,req}) => {
	const {socket,token} = useContext(context)
	let rej=()=>{
		req({})
		socket.emit('reject',token)
		
	}
	let accept=()=>{
		socket.emit('accept',token)
		req({})
	}
  return (
    <div className="modal">
    <img src='https://cdn-icons-png.flaticon.com/512/924/924915.png' alt='image'/>
      <span>{data.id}</span>
      <div className="rbtn">
        <button onClick={accept}>accept</button>
        <button onClick={rej}>reject</button>
      </div>
    </div>
  );
};
export default Modal;

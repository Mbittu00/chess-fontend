import Context from './context'
import {io} from 'socket.io-client'
import {useState,useEffect}from'react'
import { v4 as uuidv4 } from 'uuid';
import Uid from'../uid'
let socket=io('https://chass.adaptable.app/')
  const Main = ({children}) => {
	let [token,setToken]=useState('')
	let [game,setGame]=useState({})
	const [online, setOnline]=useState(false)
	useEffect(()=>{
	let getId=localStorage.getItem('token')
	if(getId){
		setToken(getId)
		socket.emit('join',getId)
		
	}else{
	//	let iid=uuidv4()
	let iid=Uid()
		localStorage.setItem('token',iid)
		setToken(iid)
		socket.emit('join',iid)
		
	}
	},[])

useEffect(()=>{
	socket.on('online',res=>{
	  	setOnline(res)
	})	
},[])
  return (
<Context.Provider value={{
	socket,token,setGame,game,online
}}>
    {children}
   </Context.Provider>
)}
export default Main

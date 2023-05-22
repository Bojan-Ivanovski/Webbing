import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import SelectPerson from './components/Select';
import Account from './components/Account';
import Bubble from './components/Bubble';
import Chats from './components/Chats';
import Head from './components/Head';
import './index.css';

function App()
{
  if(!sessionStorage.getItem("username"))
    window.location.replace("/");
  const username = sessionStorage.getItem("username");
  let [selected, setSelected] = useState("");
  let [friends, setFriends] = useState([]);
  let [chatData, setChatData] = useState([]);

  async function Send(text)
  {
    const response = await fetch(`chat-save/${username}/${selected}/${text}`);
    const data = await response.json();
    console.log(data);
    if(text) setChatData(chatData => [...chatData, {
        author: 1,
        message: text
    }]); document.getElementById("TextAreaID").value = '';
  }

  async function getChatData(friendsUsername) {
    const response = await fetch(`chat-get/${username}/${friendsUsername}`);
    const data = await response.json();
    setChatData(data);
  }

  async function getFriends() {
    const response = await fetch(`getfriends/${username}`);
    const data = await response.json();
    setFriends(data);
  }

  useEffect(() => {
    if(sessionStorage.getItem("username"))
      getFriends();
  }, [])

  useEffect(()=>{
    const timer = setInterval(async () => {
      const response = await fetch(`getfriends/${username}`);
      const data = await response.json();
      setFriends(data);
    }, 1000)
    return () => clearInterval(timer);
  }, [friends])

  useEffect(() => {
    const timer = setInterval(async () => {
      const response = await fetch(`chat-get/${username}/${selected}`);
      const data = await response.json();
      setChatData(data);
    }, 1000)
    return () => clearInterval(timer);
  }, [selected])


  function click(friendsUsername)
  {
    if (selected !== friendsUsername) {
        setSelected(friendsUsername);
        getChatData(friendsUsername);
    }
  } 

  const bubbles = chatData.map((item, index) => <Bubble key={index} auth={item.author} text={item.message} />)
  const chat = (selected !== "") ? <Chats send={Send} name={selected}> {bubbles} </Chats> : <></>;
    return <>
    <Head name="Webbing"/>
    <div className='Body'>
          <SelectPerson friendsList={friends} handleClick={click} username = {username} />
          <div className="Right-Side">
              <div className="Horizontal"/>
              <div className="Horizontal Right"/>
              {chat}
          </div>
    </div>
  </>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
          <Route index element={<Account />} />
          <Route path="webbing" element={<App />} />
          <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
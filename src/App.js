import './App.css';
import { useState, useRef } from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat con React</h1>
        <InputArea/>
      </header>
    </div>
  );
}

function InputArea(){
  //States and variables definition:
  const errObjt = { EMPTY : "Invalid input. Empty message.",
    NUMBERS : "Numbers are not valid.",
    SPECIAL : "Special characters are not allowed."
  }
  const [message, setMessage] = useState("");
  const inputRef = useRef("");
  const [messages, setArray] = useState([]);
  const [errors, setError] = useState([]);

  const removeError = ()=>{
    let auxArray = errors;
    setError(auxArray.slice(1));
  }
  const sendMessage = (event)=>{
    event.preventDefault();
    try{
      if(message===""){
        throw "EMPTY";
      }
      let letterCount = 0;
      let charsNaN = [];
      for (let i = 0; i< message.length; i++){
        if((/[a-zA-Z]/).test(message[i])) {
          letterCount += 1;
        } else {
          charsNaN.push(message[i]);
        }
      }
      if(letterCount!==message.length){
        charsNaN.forEach((character)=>{
          if(isNaN(character) && character !== " "){
            throw 'SPECIAL';
          }
          else {
            if(character !== " "){
              throw 'NUMBERS';
            }
          }
        })
      }
      let temporalArray = messages;
      temporalArray.push(message);
      setMessage("");
      setArray(temporalArray);
    }
    catch(error){
      setMessage("");
      let temporalErrors = errors;
      temporalErrors.push(errObjt[error]);
      setError(temporalErrors);
      setTimeout(removeError , 5000);
    }
  }
  const handleChange = (event)=>{
    setMessage(event.target.value);
  }
  return(
    <>
      <div className='chat-panel'>
        <Errors alert={errors}/>
        <h2 id='chat-title'>Conversación:</h2>
        <Messages array={messages}/>
      </div>
      <form>
        <input value={message} ref={inputRef} id='message' onChange={handleChange}></input>
        <button onClick={sendMessage}>Send</button>
      </form>
    </>
  )
}

function Messages(props){
  let componentsArray = [];
  let index = 0;
  props.array.forEach(element => {
      componentsArray.push(<p key={index}>{element}</p>);
      index+=1;
  });
  return(componentsArray);
}

function Errors(props){
  let errorArray = [];
  let count = 0;
  props.alert.forEach((element)=>{
    errorArray.push(<p className="error" key={count}>ERROR: {element}</p>);
    count+=1;
  })
  return(errorArray)
}
export default App;
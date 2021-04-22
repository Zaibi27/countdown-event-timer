import React,{useState , useEffect, useRef } from "react" ;
import './App.css';

function App() {
  const eventName = useRef() ;
  const eventDate = useRef() ;
  const eventTime = useRef() ;
  const [date , setDate] = useState() ;
  const [name , setName] = useState() ;
  const calculateTimeLeft = () => {
    // let year = new Date().getFullYear() ;
    const difference = +new Date(date) - +new Date();
   
    let timeLeft = {}
    if(difference > 0){
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }
    return timeLeft ;
  }

  const [timeLeft , setTimeLeft] = useState(calculateTimeLeft()) ;

  useEffect(() => {
    if(date){
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft()) ;
      }, 1000)
    }
  }) ;

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }
  
    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });
  
  

  const handleSubmit = (e) => {
    e.preventDefault() ;
    eventTime.current.value ;
  console.log(eventDate.current.value) ;
  if(new Date(eventDate.current.value) < new Date()){
    alert("Please select a future date") ;
  }
  else if(eventName.current.value === ""){
    alert("Event Name cannot be empty") ;
  }
  else{
    setDate(eventDate.current.value) ;
    setName(eventName.current.value) ;
  }
  }


  

  

  return (
    <div >
      <h1>Countdown Timer</h1>
      <h2>{name}</h2>
      <div>
        {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      </div>
      <hr />

      <div className="eventCreator" >
        <form >
          <label htmlFor="">Event Name:</label>
          <input placeholder="Enter event Name" ref={eventName}  />
          <br /><br/>
          <label htmlFor="">Date:</label>
          <input type="date" ref={eventDate}/>
          <br/><br/>
          <label htmlFor="">Time:</label>
          <input type="time"/>
          <button type="submit" onClick={handleSubmit} ref={eventTime} > Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;

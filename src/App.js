import logo from './logo.svg';
import './App.css';
import{GoogleLogin} from 'react-google-login';
import Button from 'react-bootstrap/Button';
import { gapi } from 'gapi-script';
import axios from 'axios';
import { useState } from 'react';


function App() {
const responseGoogle = response => {
  console.log(response)
  const {code} = response
  
  axios
  .post('/api/create-tokens',{code})
  .then(response => {
    console.log(response.data)
    setSignedIn(true)
  })
  .catch(error=> console.log(error.message))
}

const responseError = error => {
  console.log(error)
}

const handleSubmit =(e) =>{
  e.preventDefault()
  console.log(summary,description, location, startDateTime, endDateTime)
  axios
  .post('http://localhost:4000/api/create-tokens',{summary,
    description,
     location,
      startDateTime,
       endDateTime })
      
       .then(response => {
        console.log(response.data)
        
      })
      .catch(error=> console.log(error.message))
}

const [summary, setSummary] = useState('')
const [description, setDescription] = useState('')
const [location, setLocation] = useState('')
const [startDateTime, setstartDateTime] = useState('')
const [endDateTime, setEndDateTime] = useState('')
const [signedIn, setSignedIn] = useState('false')


  return (
    <div>
      <div className="App">
        <h1>Get-Net</h1>
      </div>
    {
      !signedIn ? (<div>
        <GoogleLogin 
        clientId='589061289971-73u6blrd4e6g64slcq8ia3pja5giv1ek.apps.googleusercontent.com'
       
      
       buttonText= 'Sign in & Authorize Calender'
        onSuccess={responseGoogle}
        onFailure={responseError}
        cookiePolicy={'single_host_origin'}
        // this is important 
        responseType='code'
        accessType='offline'
        scope='openid email profile https://www.googleapis.com/auth/calendar'
        isSignedIn={true}
    />
         </div>) : (<div>
          <form onSubmit={handleSubmit}> 
            <label htmlFor="summary">Summary</label>
            <br/>
            <input type= "text"
             id="summary"
             value={summary} 
             onChange={e => setSummary(e.target.value)}
              />
            <br/>
            
            <label htmlFor="description">Description</label>
            <br/>
            <textarea
             id="description"
             value={description} 
             onChange={e => setDescription(e.target.value)}
            />


            <br/>
            <label htmlFor="location">Location</label>
            <br/>
            <input
            type='text'
            id="location" 
            value={location} 
            onChange={e => setLocation(e.target.value)}/>
            <br/>
          

            
            <label htmlFor="starDateTime">Start Date Time</label>
            <br/>
            <input type= "datetime-local" 
            id="starDateTime" 
            value={startDateTime} 
            onChange={e => setstartDateTime(e.target.value)}/>
            <br/>
            

          
            <label htmlFor="endDateTime">End Date Time</label>
            <br/>
            <input type= "datetime-local" 
            id="endDateTime" 
            value={endDateTime} 
            onChange={e => setEndDateTime(e.target.value)}
            />
            <br />
            
            
            <button type='submit'>create event</button>
            

            </form>
         </div>)
    }

      
    </div>
  );
};

export default App;

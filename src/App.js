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
  })
  .catch(error=> console.log(error.message))
}

const responseError = error => {
  console.log(error)
}

const handleSubmit =(e) =>{
  e.preventDefault()
}

Const [summary, setSummary] = useState('')
Const [description, setDescription] = useState('')
const [location, setLocation] = useState('')

  return (
    <div>
      <div className="App">
        <h1>Get-Net</h1>
      </div>


      <div>
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
         </div>
         <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="summary">Summary</label>
            <br/>
            <input type= "text" id="summary"/>
          </form>
         </div>
    </div>
  );
}

export default App;

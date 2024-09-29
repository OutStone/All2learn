import { useState } from 'react';
import axios from 'axios';
import './App.css';

function MyPage() {

  const get = () => {
    axios.get('http://localhost:3000/data'+itemID).then((data) => {
      console.log(data)
    })
  }

  // The HTML code
  return (
    <>
    <form onSubmit={send} onLoad={get(id)}>
        
        <p><label htmlFor="textarea">your list of organisms (please separate them using commas):</label></p>
        <textarea
          id="textarea" name="textarea"
          rows="4" cols="50"
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
        <br/>
        {/* <label>Enter your name:
          <input 
            type="text"
            name='label'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label> */}
        <input type="submit"/>
      </form>
      <button onClick={get}>get</button>
    </>
  )
}

export default MyForm;
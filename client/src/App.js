import { useState } from 'react';
import axios from 'axios';
import './App.css';

function MyForm() {
  const [name, setName] = useState("");

  const get = () => {
    axios.get('http://localhost:3000/api').then((data) => {
      console.log(data)
    })
  }

  // Send() function
  const send = (event) => {
    event.preventDefault();
    const input = event.target[0].value.toString()
    var inputItems = input.split(',')

    inputItems = inputItems.map(element => {
      while (true) {
        if (element.startsWith(' ')) { // if the string starts with blank space it is removed
          
          element = element.slice(1,element.length)
        } else if (element.endsWith(' ')) { // if the string ends with blank space it is removed
          
          element = element.slice(0,-1)
        } else {
          break;
        }
      }
      return element;
      // TODO: delete element if there is nothing left of it after deleting all the blank spaces
    });

    const data = {
      textInput: inputItems
    }
    console.log(data)
    
    axios.post('http://localhost:3000/form',data)
  }

  // The HTML code
  return (
    <>
    <form onSubmit={send}>
        
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
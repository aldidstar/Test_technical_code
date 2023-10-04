import React, { useState } from 'react'
import axios from 'axios'

function InputComponent({ onInputSubmit }) {
  const [inputData, setInputData] = useState('')

  const handleInputChange = (e) => {
    setInputData(e.target.value)
  }

  const showTriangle = () => {
    // Make an API request with req.query.angka
    axios
      .get(`http://localhost:3000/api/triangle`, {
        params: {
          angka: inputData // Pass inputData as a query parameter
        }
      })
      .then(function (response) {
        // Handle the API response here
        console.log(response.data.triangle)
        onInputSubmit(response.data.triangle)
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  const showFunction = () => {
    // Make an API request with req.query.angka
    axios
      .get(`http://localhost:3000/api/prime`, {
        params: {
          angka: inputData // Pass inputData as a query parameter
        }
      })
      .then(function (response) {
        // Handle the API response here
        console.log(response.data.lastPrime)
        onInputSubmit(response.data.lastPrime)
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  const showOdd = () => {
    // Make an API request with req.query.angka
    axios
      .get(`http://localhost:3000/api/odd`, {
        params: {
          angka: inputData // Pass inputData as a query parameter
        }
      })
      .then(function (response) {
        // Handle the API response here
        console.log(response.data.lastOdd)
        onInputSubmit(response.data.lastOdd)
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  return (
    <div>
      <input
        type="text"
        value={inputData}
        onChange={handleInputChange}
        placeholder="input angka"
      />

      <div>
        <br />
        <button onClick={showTriangle}>Generate Segitiga</button>
        <button onClick={showOdd}>Generate Bilangan Ganjil</button>
        <button onClick={showFunction}>Generate Bilangan Prima</button>
      </div>
    </div>
  )
}

export default InputComponent

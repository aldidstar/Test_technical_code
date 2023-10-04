import React, { useState } from 'react'
import InputComponent from './InputComponent'
import ResultComponent from './ResultComponent'

function App() {
  const [result, setResult] = useState('')

  const handleInputSubmit = (inputData) => {
    const processedResult = inputData
    setResult(processedResult)
  }

  return (
    <div>
      <h1>Tes Pranala</h1>
      <br></br>
      <InputComponent onInputSubmit={handleInputSubmit} />
      <br></br>
      <ResultComponent result={result} />
    </div>
  )
}

export default App

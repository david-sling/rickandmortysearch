import React, { useState } from 'react'
import Modal from './components/Modal'
import Search from './components/Search'
import './styles/App.css'

export default function App() {

  const [ character, setCharacter ] = useState(null)

  return (
    <div className="App" >
      <h1>Rick and Morty Search</h1>
      <Search setCharacter={setCharacter} />
      {character&&<Modal character={character} setCharacter={setCharacter} />}
    </div>
  )
}

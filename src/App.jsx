import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import { useState, useEffect } from "react"
import './style.css'

export default function App() {

  const [dice, setDice] = useState(allNewDice())

  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    // all dice are held
    const allHeld = dice.every(die => die.isHeld)
    // all dice have the same value
    const allSameValue = dice.every(die => die.value === dice[0].value)
    
    if (allHeld && allSameValue) {
        setTenzies(true)
    }
  }, [dice])

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6), 
        isHeld: false,
        id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice())
    }
    return newDice
  }
  
  function rollDice() {
    if(tenzies) {
      // reset the game
      setDice(allNewDice())
      setTenzies(false)
    } else {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDice()
      }))
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
          {...die, isHeld: !die.isHeld} :
          die
    }))
  }
  const diceElements = dice.map(die => (
    <Die 
      key={die.id}
      value={die.value} 
      held={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div  className="dice-container">
        {diceElements}
      </div>
      <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}

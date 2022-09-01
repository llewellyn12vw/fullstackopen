import { useState, useEffect } from 'react'
import noteService from "./services/notes"
import './index.css'

const Box = ({text,val,change}) => {
  return(
        <div>
          {text}<input 
            value = {val}
            onChange = {change}/>
        </div>
  )
}

const Button = ({type,text}) => {
  return(
    <div>
      <button type={type}>{text}</button>
    </div>
  )
  }

const Notification = ({message}) => {
  const stylez = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (message === null) {
    return (
      <></>
    )
  }

  return (
    <div style = {stylez}>
      {message}
    </div>
  )
}
  


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber,setNewnum] = useState("")
  const [soek,setSoek] = useState("")
  const [addMessage, setaddMessage] = useState(null)


  useEffect(() => {
    noteService
      .getAll()
      .then(initPersons => {
        setPersons(initPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewnum(event.target.value)
  }

  const handleSearch = (event) =>  {
    setSoek(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const dup = `${newName} is already added to phonebook, replace number with new one?`
    const addM = `${newName} added succesfully`
    const addN = `Please add number`
    const same = persons.some(name => name.name === newName)
    const number = (newNumber.length>0) ? true:false


    if(same){
      if(window.confirm(dup)){
        const same_person = persons.filter(n => n.name === newName)
        const updateP = {...same_person[0], number: newNumber}
        noteService
        .update(same_person[0].id,updateP)
        .then(response=>{
          const new_persons = persons.filter(p=>p.id !== same_person[0].id)
          setPersons(new_persons.concat(updateP))
        })
      }
    }
    else if(!number){
      alert(addN)
    }
    else{
      const person = {name: newName, number: newNumber}
      noteService
        .create(person)
        .then(returnedP=>{
          console.log(returnedP)
          setPersons(persons.concat(returnedP))
          setNewName("")
          setNewnum("")
          setaddMessage(
            addM
            )
          setTimeout(() => {
            setaddMessage(null)
          }, 5000)

        })
      
    }
  }

  const deleteP = (id) => {
      noteService
      .deleteID(id)
      .then(returnedP=>{
        const updateP = persons.filter(n => n.id !== id)
        setPersons(updateP)
        window.confirm(`${returnedP} has been deleted`)
      })
  }

  const Disp = () =>{
    if(soek.length === 0){
      return (
      persons.map(num => <li key = {num.name}>{num.name} {num.number} <button onClick = {() => deleteP(num.id)}>delete</button></li>)
      )
    }
    else{
      const filt = persons.filter((person) => person.name.toLowerCase().includes(soek))
      return filt.map(per => <li key = {per.name}>{per.name} {per.number}</li>)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {addMessage}/>
          
      <Box text = "search" val = {soek} change = {handleSearch}/>

      <h2>Add Contact</h2>
      <form onSubmit={addName}>
      <Box text = "name:" val = {newName} change = {handleNameChange} />
      <Box text = "number:" val = {newNumber} change = {handleNumChange} />
      <Button type = "submit" text = "add"/> 
      </form>

      <h2>Numbers</h2>
      <div>{Disp()}</div>

    </div>

  )
}
export default App
import { useState } from 'react'

const Button = ({click,text}) => <button onClick={click}>{text}</button>

const Statisticsline = ({a,text}) => {
  return(
  <tr>
    <td>{a}</td>
    <td>{text}</td>
  </tr>
  )
}

const Statistics = ({good,bad,mild}) => {
  
  const tot = bad + good + mild
  const place = good - bad
  let ave = place/tot
  if (ave <= 0){
    ave = 0
  }
  if (good == 0 && bad == 0 && mild == 0){
    return <div>{"No data"}</div>
  }
  return (
    <table>
      <tbody>
      <Statisticsline a="good" text = {good}/>
      <Statisticsline a = "mild" text = {mild}/>
      <Statisticsline a = "bad" text = {bad}/>
      <Statisticsline a = "average" text = {ave}/>
      <Statisticsline a= "positive feedback" text = {(good/tot)*100+"%"}/>
      </tbody>
    </table>
  )

}


const App = () => {

  const f_d = "Give Feedback"
  const stat = "Stats"
  // const [ cnt, setCounter ] = useState({
  //   god:0, mild:0 , bad:0 
  // })
   // const Setgood = () => setCounter({...cnt, god:cnt.god+1})
  // const Setmild = () => setCounter({...cnt, mild:cnt.mild+1})
  // const Setbad = () => setCounter({...cnt, bad:cnt.bad+1})

  const [good, setGood] = useState(0)
  const [mild, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Setgood = () => setGood(good+1)
  const Setbad = () => setBad(bad+1)
  const Setmild = () => setNeutral(mild+1)
    

  
  return(
    <div>
      <h1>{f_d}</h1>
      <br></br>
      <br></br>
      <Button click={Setgood} text="good"/>
      <Button click={Setmild} text="mild"/>
      <Button click={Setbad} text="bad"/>
      <br></br>
      <h1>{stat}</h1>
      <br></br>
      <Statistics good ={good} bad = {bad} mild = {mild}/>


    </div>
  )





}


export default App



const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header c = {course} />
      <Content p1 = {parts} />
      <Total p1 = {parts} />
   
    </div>
  )
}
const Header = (props) => {
  return(
    <div>
      <p>{props.c}</p>
    </div>
  )
}


const Content = (props) => {
  return(
    <div>
     
      <p>{props.p1[0].name}</p>
      <p>{props.p1[0].exercises}</p>

    </div>
  )
}
// const Part = (props) => {
//   return(
//       <div>
//         <p>{props.pi[0].name} {props.pi}</p>
//         <p>{props.pi} {props.pi}</p>
//         <p>{props.pi} {props.pi}</p>
//       </div>
//   )
// }
const Total = (props) => {
  return(
    <div>
      <p>{props.p}</p>
    </div>  
  )
}



export default App
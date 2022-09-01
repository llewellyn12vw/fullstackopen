
const Course = ({ course }) =>
<div>
  <Header header={course.name} />
  <Content parts={course.parts} />
  <Total sum={stats(course)} />
</div>

const Header = ({ header }) => <h1>{header}</h1>


const Total = ({ sum }) => <p>Number of exercises {sum}</p>


const Part = ({ part }) =>
 <>
    {part.name} {part.exercises}
</>

const Content = ({ parts }) =>

  parts.map(part => <p key = {part.id}><Part part = {part}/></p>)
  

const stats = (course) => {
  const ex = course.parts.map(a => a.exercises)
  const total = ex.reduce((s, p) => s + p)
  return total
}

export default Course
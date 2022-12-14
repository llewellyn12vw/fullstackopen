import { connect } from 'react-redux'
import { addFilter } from "../reducers/filterReducer"



const Filter = (props) => {
    // const dispatch = useDispatch()
    const handleChange = (event) => {
      // input-field value is in variable event.target.value
      event.preventDefault()
      props.addFilter(event.target.value)

    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default connect(
    null, 
    { addFilter }
  )(Filter)
  
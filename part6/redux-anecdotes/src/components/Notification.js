import { connect } from 'react-redux'


const Notification = (props) => {
  // const notification = useSelector(state => state.message)
  const notification = props.message
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
  
  }
}

const ConnectedNotes = connect(mapStateToProps)(Notification)

export default ConnectedNotes
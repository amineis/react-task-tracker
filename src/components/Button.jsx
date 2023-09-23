import PropTypes from 'prop-types'

const Button = (props) => {
  return <button style={{backgroundColor: props.color}} className='btn' onClick={props.onClick}>{props.text}</button>
  
}

Button.defaultProps = {
    color: 'black',
    text: 'Add'
}


export default Button
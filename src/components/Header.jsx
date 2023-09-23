import PropTypes from 'prop-types'
import Button from './Button'
import Tasks from './Tasks'


const Header = ({ title, onShow, showAddTask }) => {
  
  
  
  return (
    <header>
        <h1>{title}</h1>
        <Button color={showAddTask ? "blue" : 'green'} text={showAddTask ? "Close" : "Add"}  onClick={onShow}/>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header
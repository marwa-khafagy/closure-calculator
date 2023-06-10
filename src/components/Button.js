import PropTypes from 'prop-types'

const Button = ({func, text}) => {
  return (
    <div>
        <button onClick={func} className='btn'>{text}</button>
    </div>
  )
}

Button.defaultProps = {
    func: () => {console.log('Clicked!')},
    text: 'Add'
  }

export default Button
import './Wrapper.scss'

const Wrapper = ({ children, ...rest }) => {
  return (
    <div className="Wrapper" {...rest}>
      {children}
    </div>
  )
}

export default Wrapper

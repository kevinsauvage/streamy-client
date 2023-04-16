import './Container.scss';

const Container = ({ children, ...rest }) => (
  <div className="Container" {...rest}>
    {children}
  </div>
);

export default Container;

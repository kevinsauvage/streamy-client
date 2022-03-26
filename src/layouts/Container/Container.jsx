import "./Container.scss";

const Container = ({ children, ...rest }) => {
  return (
    <div className="Container" {...rest}>
      {children}
    </div>
  );
};

export default Container;

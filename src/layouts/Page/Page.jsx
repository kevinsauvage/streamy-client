import "./Page.scss";

const Page = ({ children, className, ...rest }) => {
  return (
    <div className={`Page ${className ? className : ""}`} {...rest}>
      {children}
    </div>
  );
};

export default Page;

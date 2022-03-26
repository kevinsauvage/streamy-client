import "./Title.scss";

const Title = ({ title, ...rest }) => {
  return (
    <p {...rest} className="Title">
      {title}
    </p>
  );
};

export default Title;

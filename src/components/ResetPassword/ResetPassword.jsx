import "./ResetPassword.scss";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { unstopScroll } from "../../helpers/scroll";
import useForm from "../../hooks/useForm";
import Form from "../../layouts/Form/Form";
import Input from "../input/Input";
import { validateEmail } from "../../helpers/validateEmail";
import Container from "../../layouts/Container/Container";

const ResetPassword = ({ setDisplayPassRec }) => {
  const initialState = { email: "" };

  const submitResetPassword = async (e) => {
    try {
      if (!formData.email) return setError("Missing email.");
      if (!validateEmail(formData.email)) return setError("Invalid email format.");
      //await sendPasswordResetEmail(auth, formData.email);
      setError("Email correctly send.");
      setTimeout(() => setDisplayPassRec(false), 2000);
    } catch (error) {
      if (error.code === "auth/user-not-found") return setError("User not found.");
      else console.log(error);
    }
  };

  const { formData, handleInputChange, handleSubmit, loading, error, setError } = useForm(
    initialState,
    submitResetPassword
  );

  return (
    <div className="ResetPassword">
      <Container>
        <AiOutlineCloseSquare
          className="ResetPassword__close"
          onClick={() => {
            unstopScroll();
            setDisplayPassRec(false);
          }}
        />
        <Form
          title="Forgot Password ?"
          subtitle="You Can Reset Password Using This Form."
          handleSubmit={handleSubmit}
          error={error}
          loading={loading}
          btnText={"SEND"}>
          <Input
            label="Email"
            type="email"
            name="email"
            onChange={handleInputChange}
            value={formData.email}
          />
        </Form>
      </Container>
    </div>
  );
};

export default ResetPassword;

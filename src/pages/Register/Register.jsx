import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.scss";
import { validateEmail } from "../../helpers/validateEmail";
import Input from "../../components/input/Input";
import Container from "../../layouts/Container/Container";
import FormRow from "../../layouts/formRow/FormRow";
import Form from "../../layouts/Form/Form";
import useForm from "../../hooks/useForm";
import Page from "../../layouts/Page/Page";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const initialState = {
    firstName: "",
    lastname: "",
    email: "",
    password: "",
  };

  const submitCallback = async () => {
    try {
      const { firstName, lastName, email, password } = formData;

      if (!lastName || !firstName || !email || !password) return setError("Missing field.");

      if (password.length < 8) return setError("Password must be at least 8 charactere long.");

      if (!validateEmail(email)) return setError("Invalid Email");

      const res = await register(firstName, lastName, email, password);

      if (res.success) return navigate("/login");
      else {
        if (res.error?.keyPattern?.email) return setError("Email already registered.");
        else return setError("ESomething went wrong please try again.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { formData, handleInputChange, handleSubmit, loading, error, setError } = useForm(
    initialState,
    submitCallback
  );

  return (
    <Page className="Register">
      <Container>
        <Form
          title="Create an Account"
          subtitle="No credit card required."
          handleSubmit={handleSubmit}
          error={error}
          loading={loading}
          btnText={"SIGNUP"}>
          <FormRow>
            <Input
              label="First name"
              type="text"
              name="firstName"
              onChange={handleInputChange}
              value={formData.firstName}
            />
            <Input
              label="Last name"
              type="text"
              name="lastName"
              onChange={handleInputChange}
              value={formData.lastName}
            />
          </FormRow>
          <FormRow>
            <Input
              label="Email"
              type="email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
            />
            <Input
              label="Password"
              type="password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </FormRow>
        </Form>
        <p className="Register__alreadyMember">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </Container>
    </Page>
  );
};

export default Register;

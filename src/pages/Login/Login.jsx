import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import ResetPassword from "../../components/ResetPassword/ResetPassword";
import { AuthContext } from "../../context/AuthContext";
import { stopScroll } from "../../helpers/scroll";
import { setItem } from "../../helpers/sessionStorage";
import useForm from "../../hooks/useForm";
import Container from "../../layouts/Container/Container";
import Form from "../../layouts/Form/Form";
import FormRow from "../../layouts/formRow/FormRow";
import Page from "../../layouts/Page/Page";
import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const [displayPassRec, setDisplayPassRec] = useState();
  const { login } = useContext(AuthContext);

  const initialState = {
    email: "",
    password: "",
    remember: false,
  };

  const submitCallback = async () => {
    try {
      const { email, password } = formData;

      if (!email || !password) return setError("Missing field.");

      const res = await login(email, password);

      if (res.success !== true) return setError(res.message);

      setItem("user_token", res.authorization);
      setItem("user", res.user);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const { formData, handleInputChange, handleSubmit, loading, error, setError } = useForm(
    initialState,
    submitCallback
  );

  return (
    <Page className="Login">
      <Container>
        <Form
          title="Welcome Back !"
          subtitle="Have fun watching your favorite movies and tv shows."
          handleSubmit={handleSubmit}
          error={error}
          loading={loading}
          btnText={"LOGIN"}>
          <FormRow>
            <Input
              label="Email"
              type="text"
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
      </Container>
      <p
        className="Login__forgotPassword"
        onClick={() => {
          stopScroll();
          setDisplayPassRec(!displayPassRec);
        }}>
        Lost your Password?
      </p>
      {displayPassRec && <ResetPassword setDisplayPassRec={setDisplayPassRec} />}
    </Page>
  );
};

export default Login;

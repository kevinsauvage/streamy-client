import { useEffect, useState, useContext } from "react";
import Input from "../../components/input/Input";
import { UserContext } from "../../context/UserContext";
import { getItem } from "../../helpers/sessionStorage";
import useForm from "../../hooks/useForm";
import Container from "../../layouts/Container/Container";
import Form from "../../layouts/Form/Form";
import Page from "../../layouts/Page/Page";
import "./Account.scss";

const Account = () => {
  const [user, setUser] = useState(getItem("user"));

  const { update } = useContext(UserContext);

  const [initialState] = useState({
    userName: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  const submitCallback = async () => {
    try {
      const { email, firstName, lastName } = formData;

      if (!email || !firstName || !lastName) return setError("Missing field.");

      const res = await update(firstName, lastName, email, user.savedMovies, user.id);

      if (res.success) setUser(res.user);
      else setError("Something went wrong please try again");
    } catch (error) {
      console.log(error);
    }
  };

  const { formData, handleInputChange, handleSubmit, loading, error, setError, setFormData } =
    useForm(initialState, submitCallback);

  useEffect(() => {
    user &&
      setFormData({
        email: user?.email,
        firstName: user?.firstName,
        lastName: user?.lastName,
      });
  }, [user, setFormData]);

  return (
    <Page className="Account">
      <Container>
        <Form
          handleSubmit={handleSubmit}
          error={error}
          loading={loading}
          btnText={"SAVE"}
          className="Account__form">
          <p className="Account__formTitle">General Informations</p>
          <Input
            label="Email"
            type="email"
            name="email"
            onChange={() => null}
            value={formData?.email}
          />
          <Input
            label="First name"
            type="text"
            name="firstName"
            onChange={handleInputChange}
            value={formData?.firstName}
          />
          <Input
            label="Last name"
            type="email"
            name="lastName"
            onChange={handleInputChange}
            value={formData?.lastName}
          />
        </Form>
      </Container>
    </Page>
  );
};

export default Account;

import { useCallback, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Container from '../../components/Container/Container';
import Form from '../../components/Form/Form';
import FormBottom from '../../components/Form/FormBottom/FormBottom';
import Input from '../../components/input/Input';
import ResetPassword from '../../components/ResetPassword/ResetPassword';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';
import { stopScroll } from '../../helpers/scroll';
import { setItem } from '../../helpers/sessionStorage';
import useForm from '../../hooks/useForm';
import Page from '../../layouts/Page/Page';

const Login = () => {
  const navigate = useNavigate();
  const [displayPassRec, setDisplayPassRec] = useState();
  const { login } = useContext(AuthContext);
  const location = useLocation();
  const { addToMovieList, getUserMovies } = useContext(UserContext);

  const initialState = {
    email: '',
    password: '',
    remember: false,
  };

  const submitCallback = useCallback(
    async (formData) => {
      try {
        const { email, password } = formData;
        if (!email || !password) return toast.error('Missing fields.');

        const { success, message, authorization, user } = (await login(email, password)) || {};
        if (success !== true) return toast.error(message);

        setItem('user_token_streamy', authorization);
        setItem('user', user);

        await getUserMovies();

        const { path, movie, type } = location;

        if (movie && type) await addToMovieList(movie, type);

        navigate(path || '/', { state: { type } });
        toast.success('Loggin succeeded');
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong, please try again later.');
      }
    },
    [addToMovieList, getUserMovies, location, login, navigate]
  );

  const { formData, handleInputChange, handleSubmit, loading } = useForm(
    initialState,
    submitCallback
  );

  return (
    <Page className="Login">
      <Container>
        <Form
          title="Welcome Back !"
          subtitle="Have fun finding your favorite movies and tv shows."
          handleSubmit={handleSubmit}
          loading={loading}
          btnText="LOGIN"
        >
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

          <FormBottom
            firstText="Lost your Password?"
            linkText="Recover it here"
            onClick={() => {
              stopScroll();
              setDisplayPassRec(!displayPassRec);
            }}
          />

          <FormBottom firstText="Not a member yet?" linkText="Register here" href="/register" />
        </Form>
      </Container>
      {displayPassRec && <ResetPassword setDisplayPassRec={setDisplayPassRec} />}
    </Page>
  );
};

export default Login;

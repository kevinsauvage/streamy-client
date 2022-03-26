import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import PageLoader from "./components/PageLoader/PageLoader";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import "react-toastify/dist/ReactToastify.css";

const Shows = lazy(() => import("./pages/Shows/Shows"));
const Play = lazy(() => import("./pages/Play/Play"));
const Movies = lazy(() => import("./pages/Movies/Movies"));
const Home = lazy(() => import("./pages/Home/Home"));
const Filter = lazy(() => import("./pages/Filter/Filter"));
const Search = lazy(() => import("./pages/Search/Search"));
const Register = lazy(() => import("./pages/Register/Register"));
const Login = lazy(() => import("./pages/Login/Login"));
const List = lazy(() => import("./pages/List/List"));
const Account = lazy(() => import("./pages/Account/Account"));

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route exact path="/shows" element={<Shows />} />
            <Route path="/play/:id" element={<Play />} />
            <Route path="/filter" element={<Filter />} />
            <Route path="/search/:queryParam" element={<Search />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/account" element={<PrivateRoute />}>
              <Route exact path="/account" element={<Account />} />
            </Route>
            <Route exact path="/list" element={<PrivateRoute />}>
              <Route exact path="/list" element={<List />} />
            </Route>
          </Routes>
        </Suspense>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </div>
  );
};

export default App;

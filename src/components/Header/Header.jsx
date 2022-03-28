import "./Header.scss";
import { ImSearch } from "react-icons/im";
import { FaUserAlt } from "react-icons/fa";
import Container from "../../layouts/Container/Container";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { getItem } from "../../helpers/sessionStorage";
import { stopScroll, unstopScroll } from "../../helpers/scroll";
import { MdFilterList, MdOutlineHome } from "react-icons/md";
import { BiCameraMovie, BiSlideshow } from "react-icons/bi";
import useClickOutside from "../../hooks/useClickOutside";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

const Header = () => {
  const [displaySearch, setDisplaySearch] = useState(false);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [displayUserMenu, setDisplayUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const { handleLogOut } = useContext(UserContext);

  useClickOutside(userMenuRef, () => setDisplayUserMenu(false));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query && query === "") return;
    setDisplaySearch(false);
    navigate({ pathname: `/search/${query}` });
  };

  const toggleSearch = () => {
    setDisplayUserMenu(false);
    setDisplaySearch(!displaySearch);
  };

  useEffect(() => {
    if (displaySearch) stopScroll();
    else unstopScroll();
  }, [displaySearch]);

  return (
    <div className="Header">
      {displaySearch && (
        <div className="Header__searchModal">
          <AiOutlineCloseSquare className="Header__searchModal-close" onClick={toggleSearch} />
          <form className="Header__searchModal-container" onSubmit={handleSubmit}>
            <input
              autoFocus
              value={query}
              type="text"
              className="Header__searchModal-input"
              onChange={(e) => setQuery(e.target.value)}
            />
            <ImSearch className="Header__searchModal-icon" onClick={handleSubmit} />
          </form>
        </div>
      )}
      <Container>
        <Link to="/">
          <h1 className="Header__logo">Streamy</h1>
        </Link>
        <nav className="Header__nav">
          <ul className="Header__list">
            <li className="Header__listItem">
              <MdOutlineHome />
              <Link to="/">HOME</Link>
            </li>
            <li className="Header__listItem">
              <BiCameraMovie />
              <Link to="/movies">MOVIES</Link>
            </li>
            <li className="Header__listItem">
              <BiSlideshow />
              <Link to="/shows">SHOWS</Link>
            </li>
            <li className="Header__listItem">
              <MdFilterList />
              <Link to="/filter">FILTERS</Link>
            </li>
          </ul>
        </nav>
        <div className="Header__right" ref={userMenuRef}>
          <div className="Header__search" onClick={toggleSearch}>
            <ImSearch />
          </div>
          <div className="Header__userAvatar" onClick={() => setDisplayUserMenu(!displayUserMenu)}>
            <FaUserAlt />
            {displayUserMenu && (
              <nav className="Header__userMenu">
                <ul className="Header__userMenu-list">
                  {getItem("user_token_streamy") ? (
                    <>
                      <li className="Header__userMenu-listItem">
                        <Link to={"/account"}>ACCOUNT</Link>
                      </li>
                      <li className="Header__userMenu-listItem">
                        <Link to={"/list"}>MY LIST</Link>
                      </li>
                      <li
                        className="Header__userMenu-listItem Header__userMenu-listItem--logOut"
                        onClick={handleLogOut}>
                        LOGOUT
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="Header__userMenu-listItem">
                        <Link to={"/register"}>REGISTER</Link>
                      </li>
                      <li className="Header__userMenu-listItem">
                        <Link to={"/login"}>LOGIN</Link>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;

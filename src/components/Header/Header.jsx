import { useState } from 'react';

import Container from '../Container/Container';
import Navigation from '../Navigation/Navigation';
import SearchModal from '../SearchModal/SearchModal';
import UserMenu from '../UserMenu/UserMenu';

import styles from './Header.module.scss';

const Header = () => {
  const [displaySearch, setDisplaySearch] = useState(false);
  const [displayUserMenu, setDisplayUserMenu] = useState(false);

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.container}>
          <h1 className={styles.logo}>Streamy</h1>
          <Navigation classNames="hide-mobile" />
          <UserMenu
            setDisplayUserMenu={setDisplayUserMenu}
            displayUserMenu={displayUserMenu}
            setDisplaySearch={setDisplaySearch}
          />
        </div>
      </Container>
      <SearchModal setDisplaySearch={setDisplaySearch} displaySearch={displaySearch} />
    </header>
  );
};

export default Header;

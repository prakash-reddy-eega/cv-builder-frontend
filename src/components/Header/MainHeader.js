// import ThemeButton from './ThemeButton.js'
import classes from './MainHeader.module.css';
import {useSelector} from 'react-redux';
import TabItem from './TabItem';
import {GiHamburgerMenu} from 'react-icons/gi'
import { useState } from 'react';
import {AiFillCloseCircle} from 'react-icons/ai'
import { TOKEN } from '../../utils/constants';

const MainHeader = (props) => {
  const [showTabs, setShowTabs] = useState(false)
  const isAuthenticated = useSelector( state => state.auth.isAuthenticated)
  const headerOptions = [{title: 'HOME', id: 'home'},{title: 'TEMPLATES', id: 'templates'},{title: 'MY CVs', id: 'myCVs'},{title: 'PROFILE', id: 'profile'}]
  return (<>
    <header className={classes.header}>
      <h1>CV BUILDER</h1>
      <nav>
        <ul className={classes.tabsContainerLg}>
          {isAuthenticated&& headerOptions.map( each => <TabItem key={each.id} tab={each}/>)}
          {isAuthenticated && <button className={classes.button} onClick={() => {localStorage.removeItem(TOKEN)}}>LOGOUT</button>}
        </ul>
        <GiHamburgerMenu className={classes.hamburger} onClick={() => setShowTabs(!showTabs)}/>
      </nav>
    </header>
    {showTabs && 
    <header className={`${classes.header} ${classes.tabsContainerSm}`}>
      <nav>
      <ul>
        {showTabs&& headerOptions.map( each => <TabItem key={each.id} tab={each}/>)}
        {showTabs && <button className={classes.button} onClick={() => {localStorage.removeItem(TOKEN)}}>LOGOUT</button>}
      </ul>
      </nav>
      {showTabs && <AiFillCloseCircle className={classes.closeIcon} onClick={() => setShowTabs(false)}/>}
    </header>
    }
    </>
  );
};

export default MainHeader;
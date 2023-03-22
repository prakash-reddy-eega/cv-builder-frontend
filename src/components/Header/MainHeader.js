// import ThemeButton from './ThemeButton.js'
import classes from './MainHeader.module.css';
import { useDispatch, useSelector} from 'react-redux';
import { authActions } from '../../store/auth';
import TabItem from './TabItem';
import { useLayoutEffect } from 'react';
import {GiHamburgerMenu} from 'react-icons/gi'
import { useState } from 'react';
import {AiFillCloseCircle} from 'react-icons/ai'

const MainHeader = (props) => {
  const [showTabs, setShowTabs] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const dispatch = useDispatch()
  const isAuthenticated = useSelector( state => state.auth.isAuthenticated)
  const headerOptions = [{title: 'HOME', id: 'home'},{title: 'TEMPLATES', id: 'templates'},{title: 'MY CVs', id: 'myCVs'},{title: 'PROFILE', id: 'profile'}]
  const changeActiveTab = (id) => {
    setActiveTab(id)
  }
  return (<>
    <header className={classes.header}>
      <h1>CV BUILDER</h1>
      <nav>
        <ul className={classes.tabsContainerLg}>
          {isAuthenticated&& headerOptions.map( each => <TabItem activeTab={activeTab} changeActiveTab={changeActiveTab} key={each.id} tab={each}/>)}
          {isAuthenticated && <button className={classes.button}>LOGOUT</button>}
        </ul>
        <GiHamburgerMenu className={classes.hamburger} onClick={() => setShowTabs(!showTabs)}/>
      </nav>
    </header>
    {showTabs && 
    <header className={`${classes.header} ${classes.tabsContainerSm}`}>
      <nav>
      <ul>
        {showTabs&& headerOptions.map( each => <TabItem activeTab={activeTab} changeActiveTab={changeActiveTab} key={each.id} tab={each}/>)}
        {showTabs && <button className={classes.button}>LOGOUT</button>}
      </ul>
      </nav>
      {showTabs && <AiFillCloseCircle className={classes.closeIcon} onClick={() => setShowTabs(false)}/>}
    </header>
    }
    </>
  );
};

export default MainHeader;
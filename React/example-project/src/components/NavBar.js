import React from 'react';
import SearchField from './SearchField';
import logo from '../img/harley.png';
import ProfilePanel from './ProfilePanel';

function NavBar() {
  return (
    <div className = 'navbar'>
        <div className='container'>
            <SearchField />
            <div className='col-6 text-center'>
                <img src={logo}/>
            </div>
            <ProfilePanel/>
        </div>
    </div>
  );
}

export default NavBar;

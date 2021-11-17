import React from 'react';
import { Link } from 'react-router-dom';
import header__logo from '../image/header__logo.svg';

function  Header(props){

    const[userInfoOpen, setUserInfoOpen] = React.useState(false);

    function onUserInfoOpen(){
        setUserInfoOpen(!userInfoOpen);
    }

    return(
        <>
        <div className={`pre-header ${userInfoOpen ? 'pre-header_opened' : '' }`}>
            <p className="pre-header__user-email">{props.headerUserEmail || ''}</p>
            <button className="pre-header__button" onClick={props.signOut}>{props.buttonName}</button>
        </div>
        <header className="header">
            <img className="header__logo" src={header__logo} alt="Место. Россия" />
            <div className={`${props.loggedIn ? `header__wrapper ${!userInfoOpen ? 'header__wrapper_type_nav' : 'header__wrapper_type_exit'}` : 'header__wrapper_type_hidden'}`} onClick={onUserInfoOpen}>
                <p className="header__user-email">{props.headerUserEmail || ''}</p>
                <button className="header__button" onClick={props.signOut}>{props.buttonName}</button>
            </div>
            <Link className={`header__link ${props.loggedIn ? 'header__link_type_hidden' : ''}`} to={props.linkPath || ''}>{props.linkName || ''}</Link>
        </header>
        </>
    )
}

export default Header;
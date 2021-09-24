import logo from '../images/logo/header__logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
    
    return (
        <header className="header">
            <a href="#top" target="_self"><img className="header__logo" src={logo}
                alt="Проект Место" /></a>
            {props.children}
        </header>
    );
};

export default Header;
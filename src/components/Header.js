import logo from '../images/logo/header__logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
    
    return (
        <header className="header">
            <a href="#top" target="_self"><img className="header__logo" src={logo}
                alt="Проект Место" /></a>
            <Link className="header__title auth__link" to="/sign-up">Регистрация</Link>
        </header>
    );
};

export default Header;
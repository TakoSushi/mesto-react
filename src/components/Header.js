import whiteLogo from '../images/mesto-logo_white.svg';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={whiteLogo} alt="логотип Место"/>
    </header>
  );
}

export default Header;
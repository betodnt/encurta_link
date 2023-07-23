import './menu.css';
import { BsLinkedin, BsGithub } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <div className="menu">
      <a
        href="https://linkedin.com/in/roberto-sabino-sabino-61891b238"
        className="social"
        target="blank"
      >
        <BsLinkedin color="#fff" size={30} />
      </a>
      <a href="https://github.com/betodnt/betodnt_portfolio" className="social" target="blank">
        <BsGithub color="#fff" size={30} />
      </a>
      <Link to="./Links" className="menu-item">
        Meus Links
      </Link>
    </div>
  );
}

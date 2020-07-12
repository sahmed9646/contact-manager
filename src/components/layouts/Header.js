import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus, faQuestion } from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
  const { branding } = props;
  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-primary mb-3 py-0 navbar-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            {branding}
          </Link>
          <div>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <FontAwesomeIcon icon={faHome} /> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact/add" className="nav-link">
                  <FontAwesomeIcon icon={faPlus} />
                  Add
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  <FontAwesomeIcon icon={faQuestion} /> About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;

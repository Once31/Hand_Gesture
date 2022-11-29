import React from "react";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <nav className="Nav">
      <ul>
        <li>
          <Link to="/">Hand</Link>
        </li>
        <li>
          <Link to="/music">Music</Link>
        </li>
        <li>
          <Link to="/game">Game</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

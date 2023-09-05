import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import logo from '../../assets/logo.png';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark  bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">
        <img src={logo} alt="logo" width="200" height="100" />
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
        <li className="nav-item pad20">
            <span className="navbar-text">Welcome, {user.name}</span>
          </li>
          <li className="nav-item pad20">
            <Link className="nav-link" to="/books/add">Add Book</Link>
          </li>
          <li className="nav-item pad20">
            <Link className="nav-link" to="/books">View Books</Link>
          </li>
          <li className="nav-item pad20">
            <Link className="nav-link" to="/orders/new">New Order</Link>
          </li>
          <li className="nav-item pad20">
            <Link className="nav-link" to="/orders">Order History</Link>
          </li>
          <li className="nav-item pad20">
            <Link className="nav-link" to="" onClick={handleLogOut}>Log Out</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    );
}
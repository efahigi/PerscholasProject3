import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service'

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();

    setUser(null);
  }

  return (
    <nav>
      <Link to='/books'>Add Book</Link>
      &nbsp; | &nbsp;
      <Link to='/books/new'>Book List</Link>
      &nbsp;&nbsp; <span>Welcome, {user.name}</span>
      &nbsp;&nbsp;
      <Link to='' onClick={handleLogOut}>
        Log Out
      </Link>
    </nav>
  );
}

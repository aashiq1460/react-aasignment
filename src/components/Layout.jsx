import {Link, Outlet, useLocation} from 'react-router';

const Layout = () => {
  useLocation();

  const token = localStorage.getItem('token');
  const isLoggedIn = Boolean(token);

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/profile">Profile</Link>
          </li>

          <li>
            <Link to="/upload">Upload</Link>
          </li>

          {!isLoggedIn && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          )}
        </ul>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
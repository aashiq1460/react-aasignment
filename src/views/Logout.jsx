import {useNavigate} from 'react-router';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('Logged out. Token removed.');
    navigate('/');
  };

  return (
    <>
      <h1>Logout</h1>
      <p>Click the button below to log out.</p>

      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Logout;
import {useUserContext} from '../hooks/contextHooks';

const Logout = () => {
  const {handleLogout} = useUserContext();

  return (
    <>
      <h1>Logout</h1>
      <p>Click the button below to log out.</p>

      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Logout;
import {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';

const Profile = () => {
  const [user, setUser] = useState(null);
  const {getUserByToken} = useUser();

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          return;
        }

        const result = await getUserByToken(token);

        setUser(result.user ?? result);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    getUser();
  }, []);

  if (!user) {
    return <h2>No user logged in</h2>;
  }

  return (
    <>
      <h1>Profile</h1>

      <p>
        <strong>Username:</strong> {user.username}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>User ID:</strong> {user.user_id}
      </p>
    </>
  );
};

export default Profile;
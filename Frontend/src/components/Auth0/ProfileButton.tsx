import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Dropdown } from 'flowbite-react';
import { useMemo } from 'react';
import { Link, Navigate } from 'react-router-dom';

export const ProfileButton = () => {
  const { logout, user } = useAuth0();
  const userInitials = [user?.given_name, user?.family_name].filter(Boolean).join('') || 'U';


  const logoutWithRedirect = useMemo(() => () => {
    logout({ 
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  }, [logout]);

  return (
    <Dropdown
      label={<Avatar img={user?.picture} placeholderInitials={userInitials} rounded />}
      arrowIcon={false}
      placement="bottom-end"
      inline
    >
      {/* <Dropdown.Header> */}
        {/* <span className="block text-sm">{user?.name}</span> */}
        {/* <span className="block truncate text-sm font-medium">{user?.email}</span> */}
      {/* </Dropdown.Header> */}
      <Dropdown.Item className="text-sm" >
      <Link to={'/dashboard'}>  Go to Dashboard</Link>
      </Dropdown.Item>
      <Dropdown.Item className="text-red-600" onClick={logoutWithRedirect}>
        Log out
      </Dropdown.Item>
    </Dropdown>
  );
};

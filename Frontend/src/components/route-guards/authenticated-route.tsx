import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { env } from '~/env';
import {Loader} from '../Loader'

export const AuthenticatedRoute = () => {
  const location = useLocation();
  const { isAuthenticated,isLoading } = useAuth0();

  if(isLoading){
    return <Loader />
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={env.VITE_APP_HOME_PATH} state={{ from: location }} replace />;
};

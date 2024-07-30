import { Navigate } from 'react-router-dom';

export function NewPage() {
  return <Navigate to={`/dashboard/board/${Math.random().toString().slice(2)}`} replace />;
}

import { Routes, Route } from 'react-router-dom';

import { UnauthenticatedRoute } from './components/route-guards/unauthenticated-route';
// import LoginPage from './pages/loginPage';
import { AuthenticatedRoute } from './components/route-guards/authenticated-route';
import { AppLayout } from './pages/(app)/_layout';
// import { AppIndexPage } from './pages/(app)';
// import { NewPage } from './pages/(app)/new';
// import { BoardPage } from './pages/(app)/board';
import LoginPage from './pages/loginPage'
import LandingPage from './pages/landing-page';
import ChatInterface from './pages/react-chat-view'
import Layout from './components/layout/layout';
// import TableScreen from './pages/react-table-view';
import TableScreen from './pages/project-table';
const App:React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/' element={<LandingPage />} />
      <Route element={<UnauthenticatedRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<ChatInterface />} />
          <Route path="/dashboard/table" element={<TableScreen />} />


          {/* <Route path="/dashboard/new" element={<NewPage />} />
          <Route path="/dashboard/board/:board" element={<BoardPage />} />
          <Route path="/dashboard/board/:board/*" element={<BoardPage />} /> */}
        </Route>
      </Route>


      {/* Protected Routes */}
      {/* <Route element={<AuthenticatedRoute />}>
        
      </Route> */}

    </Routes>
  );
}

export default App;

import './index.css';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter , Routes,Route } from 'react-router-dom';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { env } from './env.js';
import { ReactFlowProvider } from '@xyflow/react';
import { Flowbite } from 'flowbite-react';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import App from './App.js';

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: null!,
  },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// function App() {
//   const auth = useAuth0();

//   return (
//     <Auth0Provider
//       domain={env.VITE_AUTH0_DOMAIN}
//       clientId={env.VITE_AUTH0_CLIENT_ID}
//       authorizationParams={{
//         redirect_uri: window.location.origin,
//       }}
//     >
//       <Flowbite>
//         <ReactFlowProvider>
//           <RouterProvider router={router} context={{ auth }} />
//         </ReactFlowProvider>
//       </Flowbite>
//     </Auth0Provider>
//   );
// }

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <BrowserRouter>
          <Auth0Provider
      domain={env.VITE_AUTH0_DOMAIN}
      clientId={env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin+`/dashboard`,
      }}
    >
      <Flowbite>
        <ReactFlowProvider>
         <Routes>
          <Route path='/*' element={ <App />} />
          </Routes>    
        </ReactFlowProvider>
      </Flowbite>
    </Auth0Provider>
    </BrowserRouter>
      
    
    </StrictMode>,
  );
}

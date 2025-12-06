import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';
import reportWebVitals from './reportWebVitals.ts';

import { Provider } from '@/components/ui/provider';
import { AuthProvider, useAuth } from '@/auth';
import './styles.css';

interface MyRouterContext {
  auth: {
    isAuthenticated: boolean;
    user: {
      uuid: string;
      username: string;
      email: string;
      firstName: string;
      lastName: string;
    } | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
  };
}

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  } as MyRouterContext,
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// ? I am unsure how this works
function App() {
  const auth = useAuth();

  return (
    <RouterProvider
      router={router}
      context={{
        auth,
      }}
    />
  );
}

const rootElement = document.getElementById('app');
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Provider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

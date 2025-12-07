import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';

import reportWebVitals from './reportWebVitals.ts';

import { Provider } from '@/components/ui/provider';
import { AuthProvider, useAuth } from '@/auth';
import './styles.css';
import { router } from '@/router.tsx';

function App() {
  const auth = useAuth();
  console.log('AAA App auth', auth);
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

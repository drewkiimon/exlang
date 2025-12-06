import {
  Outlet,
  createRootRoute,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Main from '@/components/layout/Main';
import { AuthProvider } from '@/auth';

interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; username: string; email: string } | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

interface MyRouterContext {
  auth: AuthState;
}

const queryClient = new QueryClient();

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Main>
          <Outlet />
        </Main>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      </QueryClientProvider>
    </AuthProvider>
  ),
});

import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Main from '@/components/layout/Main';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Set up a fetch function that attaches a header to each request
      queryFn: async ({ queryKey, meta }) => {
        throw new Error('test');
        const url = typeof queryKey[0] === 'string' ? queryKey[0] : undefined;
        if (!url) throw new Error('Query key[0] must be a url string');
        const response = await fetch(url, {
          headers: {
            'X-Custom-Header': 'my-header-value',
            ...((meta && meta.headers) || {}),
          },
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      },
    },
  },
});

export const Route = createRootRoute({
  component: () => (
    <>
      <QueryClientProvider client={queryClient}>
        <Main>
          <Outlet />
        </Main>
      </QueryClientProvider>
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
    </>
  ),
});

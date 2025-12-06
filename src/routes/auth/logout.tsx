import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/auth/logout')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.navigate({ to: '/auth/sign-in' });
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return null;
}

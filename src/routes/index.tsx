import { createFileRoute } from '@tanstack/react-router';
import Feed from '@/components/feed/Feed';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return <Feed />;
}

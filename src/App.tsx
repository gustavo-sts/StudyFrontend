import { Routes } from './routes';
import { ColorModeProvider } from './components/ui/color-mode';

export function App() {
  return (
    <ColorModeProvider>
      <Routes />
    </ColorModeProvider>
  );
}

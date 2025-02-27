import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header />
        <div style={{ maxWidth: '1200px', padding: '2rem', margin: '0 auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

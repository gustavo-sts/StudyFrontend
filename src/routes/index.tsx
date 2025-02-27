import { createBrowserRouter, RouterProvider, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Dashboard } from '../pages/Dashboard';
import { Home } from '../pages/Home';
import { PrivateRoute } from './PrivateRoute';
import { StudyPlan } from '../pages/StudyPlan';
import { Flashcards } from '../pages/Flashcards';
import { Questions } from '../pages/Questions';
import { Performance } from '../pages/Performance';
import { Calendar } from '../pages/Calendar';
import { Planner } from '../pages/Planner';
import { AIChat } from '../pages/AIChat';
import { Summaries } from '../pages/Summaries';
import { Layout } from '../components/Layout';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>
      <h1>404: Página não encontrada</h1>
      <p style={{ marginTop: '1rem' }}>A página que você está procurando não existe.</p>
      <button onClick={() => navigate('/')} style={{ marginTop: '1rem' }}>
        Voltar para a página inicial
      </button>
    </div>
  );
}

function PrivateLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export function Routes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <NotFound />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/app',
      element: (
        <PrivateRoute>
          <PrivateLayout />
        </PrivateRoute>
      ),
      children: [
        {
          path: '',
          element: <Navigate to="dashboard" replace />,
        },
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
        {
          path: 'study-plan',
          element: <StudyPlan />,
        },
        {
          path: 'flashcards',
          element: <Flashcards />,
        },
        {
          path: 'questions',
          element: <Questions />,
        },
        {
          path: 'performance',
          element: <Performance />,
        },
        {
          path: 'calendar',
          element: <Calendar />,
        },
        {
          path: 'planner',
          element: <Planner />,
        },
        {
          path: 'ai-chat',
          element: <AIChat />,
        },
        {
          path: 'summaries',
          element: <Summaries />,
        },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

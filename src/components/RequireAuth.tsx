import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginPromptModal from './LoginPromptModal';

interface Props {
  children: React.ReactNode;
}

/**
 * Wraps a page that requires login.
 * - If the user IS logged in → render the page normally.
 * - If the user is NOT logged in → show a login-prompt modal and
 *   navigate back to "/" when the modal is closed.
 */
export default function RequireAuth({ children }: Props) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  // Once we know auth state, open the modal if not logged in
  useEffect(() => {
    if (!loading && !user) {
      setModalOpen(true);
    }
  }, [loading, user]);

  // While checking auth, render nothing
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not logged in: show modal; when closed, go back to home
  if (!user) {
    return (
      <LoginPromptModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          navigate('/', { replace: true });
        }}
      />
    );
  }

  // Logged in: render page
  return <>{children}</>;
}

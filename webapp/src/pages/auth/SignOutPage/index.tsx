import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSignInRoute } from '../../../lib/routes';
import { trpc } from '../../../lib/trpc';

export const SignOutPage = () => {
  const navigate = useNavigate();

  const trpcUtils = trpc.useUtils();

  useEffect(() => {
    const signOut = async () => {
      Cookies.remove('token');

      await trpcUtils.invalidate().catch((error) => {
        console.error('Failed to invalidate cache:', error);
      });

      await navigate(getSignInRoute());
    };

    void signOut().catch((error) => {
      console.error('Failed to sign out:', error);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <p>Loading...</p>;
};

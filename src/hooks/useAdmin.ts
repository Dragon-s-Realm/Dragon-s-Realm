import { useState, useEffect } from 'react';

const ADMIN_KEY = 'dragons_realm_admin';

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem(ADMIN_KEY) === 'true';
  });

  useEffect(() => {
    localStorage.setItem(ADMIN_KEY, isAdmin.toString());
  }, [isAdmin]);

  const toggleAdmin = () => setIsAdmin(prev => !prev);
  const grantAdmin = () => setIsAdmin(true);
  const revokeAdmin = () => setIsAdmin(false);

  return { isAdmin, toggleAdmin, grantAdmin, revokeAdmin };
};

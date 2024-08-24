import { AuthContext } from '@/context/auth';
import { useContext } from 'react';

export const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
}
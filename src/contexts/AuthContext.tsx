import { createContext } from "react";

interface IAuthContext {
  authenticated: boolean;
  user?: {
    id: string;
    name: string;
    lastLogin: string;
  };
}

const AuthContext = createContext<IAuthContext>({ authenticated: false });

export default AuthContext;

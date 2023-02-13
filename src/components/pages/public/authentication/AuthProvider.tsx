import { useState, createContext, useEffect } from "react";
import Fetch from "@utils/fetchClient/fetch";
import decodeJWTToken from "@utils/jwt/jwt";
import { deleteCookie } from "@utils/cookies/cookies";
import fetch from "@utils/fetchClient/fetch";

export interface AuthContextType {
  user: IDecodedAuthToken;
  signin: (accessToken: string | null, callback: VoidFunction) => Promise<void>;
}

export interface IDecodedAuthToken {
  customerId: string;
  customerName: string;
  customerEmail: string;
  iat: number;
  exp: number;
}

export interface ICallback {
  (data: IDecodedAuthToken | null): void;
}

export interface ILoginParams {
  email: string;
  password: string;
}

export const AuthContext = createContext<AuthContextType>(null!);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  let signin = (accessToken: string | null, callback: VoidFunction) => {
    return authenticate.signin(
      accessToken,
      (data: Record<string, any> | null) => {
        setUser(data);
        callback();
      }
    );
  };

  let value = { user, signin };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const authenticate = {
  isAuthenticated: false,
  async signin(accessToken: string | null, callback: ICallback) {
    const isTokenValid: IDecodedAuthToken | null = decodeJWTToken(accessToken);
    if (isTokenValid) {
      authenticate.isAuthenticated = true;
      callback(isTokenValid);
    } else {
      try {
        const token = await Fetch.post("api/v1/auth/refresh", {});
        if (!token?.error) {
          localStorage.setItem("accessToken", token.accessToken);
          authenticate.isAuthenticated = true;
          const decoded: IDecodedAuthToken | null = decodeJWTToken(
            token.accessToken
          );
          callback(decoded);
        } else {
          callback(null);
        }
      } catch (error) {
        callback(null);
      }
    }
  },
  async signout(callback: VoidFunction) {
    deleteCookie("refreshToken");
    localStorage.removeItem("accessToken");
    await fetch.post("api/v1/auth/logout", {});
    callback();
  },
};

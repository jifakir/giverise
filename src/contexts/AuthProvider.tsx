import React, { useEffect, useState } from "react";
import useAsyncEffect from "use-async-effect";
import api, { getToken } from "../utils/api";
import cookie from "js-cookie";

function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: string;
  address?: string;
  stripeCustomerId?: string;
  countryOfOrigin?: string;
  currentCityAndCountry?: string;
  socialLogin?: {
    type: string;
    email: string;
    avatar: string;
    accessToken: string;
  };
  roleId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type AuthProviderType = "google" | "facebook" | "instagram" | "linkedin";
export type AuthStatusType = "success" | "failed" | "in-progress" | "idle";
export type StateType = {
  user: IUser | null;
  token: string;
  authStatus: AuthStatusType;
  updateUser?: (user: any) => void;
  handleOAuthLogin?: (provider: AuthProviderType) => void;
  handleBasicLogin?: (data: Record<string, string>) => void;
  updateisNewSocialUser?: (isnew: boolean | null) => void;
  logout?: () => void;
  isNewSocialUser: boolean | null;
};

const initialState: StateType = {
  user: null,
  isNewSocialUser: null,
  token: "",
  authStatus: "idle",
};

export const AuthContext = React.createContext(initialState);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<any>(null);
  const [isNewSocialUser, setisNewSocialUser] = useState<boolean | null>(null);
  const [authStatus, setAuthStatus] = useState<AuthStatusType>("idle");

  useAsyncEffect(
    async (isMounted) => {
      const authToken: string | undefined = getToken();
      if ((!user && authToken) || String(authToken) !== token) {
        try {
          const { data } = await api<any, any>("/users/profile");
          if (!isMounted()) return;

          setToken(authToken);
          setUser(data);
          setAuthStatus("success");
          if (isNewSocialUser) {
            cookie.remove("token");
          }
        } catch (error) {
          if (!isMounted()) return;
          setToken(null);
          setUser(null);
          setAuthStatus("failed");
          cookie.remove("token");
        }
      }
    },
    [token]
  );

  useEffect(() => {
    const decodedJwt = cookie.get("token")
      ? parseJwt(cookie.get("token") as string)
      : null;
    if (cookie.get("token") && decodedJwt?.exp * 1000 < Date.now()) {
      logout();
    }
  }, [token]);

  const updateUser = (user: IUser) => {
    setUser(user);
  };

  console.log(token);

  const handleOAuthLogin = async (provider: string) => {
    if (provider) {
      const authLink = `${process.env.NEXT_PUBLIC_BASEURL}/api/auth/${provider}/login?redirect=${window.location.href}`;
      const win = window.open(
        authLink,
        "auth",
        "width=600,height=600,scrollbars=yes"
      );
      let count = 0;

      setAuthStatus("in-progress");

      const intervalId = setInterval(() => {
        try {
          if (win?.location.href.includes("token")) {
            const params = new URLSearchParams(win.location.search);
            const token = params.get("token") ?? "";
            const isNew = params.get("new");
            setisNewSocialUser(Boolean(isNew));
            if (token) {
              cookie.set("token", token, {
                expires: parseJwt(token).exp,
              });
              setToken(token);
            }
            win.close();
            clearInterval(intervalId);
            count = 0;
          }
        } catch (error) {
          //if there is something wrong then it will close popup window after (100*300) seconds // todo comeup with more genius logic
          if (count >= 100) {
            win?.close();
            setAuthStatus("failed");
            clearInterval(intervalId);
            count = 0;
          }
        }
        count++;
      }, 300);
    }
  };

  const handleBasicLogin = async (payload: Record<string, string>) => {
    try {
      const { data, meta } = await api<any, any>("/auth/login", payload);
      cookie.set("token", meta.token, {
        expires: parseJwt(meta.token).exp,
      });
      setUser(data);
      setToken(meta.token);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    cookie.remove("token");
    window.location.reload();
  };

  const updateisNewSocialUser = (val: boolean | null) => {
    setisNewSocialUser(val);
    if (token) {
      cookie.set("token", token);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        authStatus,
        isNewSocialUser,
        updateUser,
        updateisNewSocialUser,
        handleOAuthLogin,
        handleBasicLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

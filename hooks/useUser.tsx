import { UserData } from "@/core/types/user";
import { auth } from "@/firebase/config";
import {
  User,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type UserContextType = {
  onUserSignUp: (...args: any[]) => void;
  onUserSignIn: (...args: any[]) => void;
  onLogout: (...args: any[]) => void;
  isLoading: boolean;
  accessToken: string | null;
  user: UserData | null;
  error: string;
};

export const UserContext = createContext<any | undefined>(
  undefined
);

export type MyUserContextProviderProps = {
  [propName: string]: any;
};

export const MyUserContextProvider = (
  props: MyUserContextProviderProps
) => {
  const [isLoading, setIsLoading] =
    useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserData | null>(
    null
  );
  const [accessToken, setAccessToken] = useState<
    string | null
  >(null);

  const setUser = async (user: User) => {
    const accessToken = await user.getIdToken();
    setUserInfo({ email: user.email, uid: user.uid });
    setAccessToken(accessToken);
  };

  const getLoggedInUser = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  };

  useEffect(() => {
    getLoggedInUser();
  }, []);

  const onUserSignUp = async (
    email: string,
    password: string,
    cb: (...args: any[]) => void
  ) => {
    try {
      setIsLoading(true);
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const { user } = userCredential;
      setUser(user);
    } catch (error: any) {
      const errorCode = error.code;
      setError(errorCode);
      cb();
    } finally {
      setIsLoading(false);
    }
  };

  const onUserSignIn = async (
    email: string,
    password: string,
    cb: (...args: any[]) => void
  ) => {
    try {
      setIsLoading(true);

      await setPersistence(auth, browserLocalPersistence);

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const { user } = userCredential;
      setUser(user);
      cb();
    } catch (error: any) {
      const errorCode = error.code;

      setError(
        errorCode === "auth/wrong-password"
          ? "Please enter the correct password"
          : errorCode
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onLogout = async () => {
    try {
      await signOut(auth);
      setAccessToken(null);
      setUserInfo(null);
    } catch (e) {}
  };

  return (
    <UserContext.Provider
      value={{
        onUserSignIn,
        onUserSignUp,
        accessToken,
        isLoading,
        user: userInfo,
        error,
        onLogout,
      }}
      {...props}
    />
  );
};

export const useUser = () => {
  const context: UserContextType = useContext(UserContext);

  if (context === undefined) {
    throw new Error(
      `useUser must be used within a MyUserContextProvider.`
    );
  }

  return context;
};

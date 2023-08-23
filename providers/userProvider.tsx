"use client";

import { MyUserContextProvider } from "@/hooks/useUser";
import { FC } from "react";

type UserProviderProps = {
  children: React.ReactNode;
};

const UserProvider: FC<UserProviderProps> = (props) => {
  const { children } = props;

  return (
    <MyUserContextProvider>
      {children}
    </MyUserContextProvider>
  );
};

export default UserProvider;

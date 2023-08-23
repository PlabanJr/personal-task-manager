"use client";

import AuthForm from "@/components/AuthForm";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import NavItem from "@/components/SideNav/NavItem";
import { AuthPaths, Paths } from "@/core/constants/app";
import { EAuthForm, ERouteKeys } from "@/core/enums/app";
import { TAuthPath, TPath } from "@/core/types/app";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { usePathname } from "next/navigation";
import { FC, PropsWithChildren, useMemo } from "react";

type SideNavProps = {};

const SideNav: FC<PropsWithChildren<SideNavProps>> = (
  props
) => {
  const { children } = props;
  const pathname = usePathname();
  const { type, onClose, onOpen } = useAuthModal();
  const { accessToken, onLogout, user } = useUser();

  const isLoggedIn = useMemo(() => {
    return !!accessToken;
  }, [accessToken]);

  const onAuthButtonClick = (routeKey: ERouteKeys) => {
    let type = EAuthForm.SIGNIN;
    if (routeKey === ERouteKeys.SIGNUP) {
      type = EAuthForm.SIGNUP;
    }

    onOpen(type);
  };

  return (
    <div className="flex h-full">
      <nav className="hidden md:flex justify-between flex-col gap-y-2 h-full w-[280px]  border-r border-neutral-500">
        <div className="flex flex-col gap-y-4 px-5 py-4">
          <h1 className=" text-2xl font-semibold">
            Task Manager
          </h1>

          <div className="flex flex-col gap-y-2 py-4">
            {Paths.map((path: TPath) => {
              const { routeKey, href, icon, label } = path;
              const isPathActive = pathname === href;

              return (
                <NavItem
                  key={routeKey}
                  href={href}
                  label={label}
                  icon={icon}
                  active={isPathActive}
                />
              );
            })}
          </div>
        </div>

        <div className="flex flex-row gap-x-4 px-5 py-4">
          {isLoggedIn ? (
            <Button label={"Logout"} onClick={onLogout} />
          ) : (
            AuthPaths.map((path: TAuthPath) => {
              const { routeKey, label } = path;

              return (
                <Button
                  key={routeKey}
                  label={label}
                  onClick={() =>
                    onAuthButtonClick(routeKey)
                  }
                />
              );
            })
          )}
        </div>
      </nav>

      <main className="h-full flex-1 overflow-y-auto">
        {children}
      </main>

      {type !== null && (
        <Modal
          title={
            type === EAuthForm.SIGNUP
              ? "Sign Up"
              : "Sign In"
          }
          onCloseModal={onClose}
        >
          <AuthForm
            type={type}
            onSubmitComplete={onClose}
          />
        </Modal>
      )}
    </div>
  );
};

export default SideNav;

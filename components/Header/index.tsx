"use-client";

import AuthForm from "@/components/AuthForm";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import NavItem from "@/components/SideNav/NavItem";
import TaskForm from "@/components/TaskForm";
import { AuthPaths, Paths } from "@/core/constants/app";
import { EAuthForm, ERouteKeys } from "@/core/enums/app";
import { TAuthPath, TPath } from "@/core/types/app";
import useAuthModal from "@/hooks/useAuthModal";
import useTasksHook from "@/hooks/useTasksHook";
import { useUser } from "@/hooks/useUser";
import { usePathname } from "next/navigation";
import { FC, useMemo, useState } from "react";

type HeaderProps = {
  label?: string;
};

const Header: FC<HeaderProps> = (props) => {
  const { label } = props;

  const pathname = usePathname();
  const { type, onClose, onOpen } = useAuthModal();
  const { accessToken, onLogout, user } = useUser();
  const { isLoading } = useTasksHook();

  const isLoggedIn = useMemo(() => {
    return !isLoading && !!accessToken;
  }, [accessToken, isLoading]);

  const [showTaskCreateModal, setShowTaskCreateModal] =
    useState<boolean>(false);

  const onToggleModal = () => {
    setShowTaskCreateModal((prev) => !prev);
  };

  const onAuthButtonClick = (routeKey: ERouteKeys) => {
    let type = EAuthForm.SIGNIN;
    if (routeKey === ERouteKeys.SIGNUP) {
      type = EAuthForm.SIGNUP;
    }

    onOpen(type);
  };

  return (
    <div className={`h-fit py-5 px-4`}>
      <div className="w-full flex gap-x-20 items-center justify-between">
        <div className="flex md:flex-1 md:justify-between gap-x-3 items-center">
          {isLoggedIn && (
            <>
              <h1 className=" text-2xl font-semibold">
                {label}
              </h1>

              <div className="hidden md:flex">
                <Button
                  label="Add Task"
                  onClick={onToggleModal}
                  classOverride=" px-2 py-0"
                />
              </div>
            </>
          )}
        </div>

        <div className="flex flex-1 justify-end md:hidden gap-x-2">
          {isLoggedIn && (
            <div className="flex flex-1 md:hidden items-center">
              {Paths.map((path: TPath) => {
                const { routeKey, href, label } = path;
                const isPathActive = pathname === href;

                return (
                  <NavItem
                    key={routeKey}
                    href={href}
                    label={label}
                    active={isPathActive}
                  />
                );
              })}
            </div>
          )}

          <div className="flex justify-between items-center gap-x-4">
            {isLoggedIn ? (
              <>
                <Button
                  label={"Logout"}
                  onClick={onLogout}
                />
                <Button
                  label="Add Task"
                  onClick={onToggleModal}
                  classOverride="px-2 py-0"
                />
              </>
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
        </div>
      </div>

      {showTaskCreateModal && (
        <Modal
          onCloseModal={onToggleModal}
          title="Create Task"
        >
          <TaskForm onTaskComplete={onToggleModal} />
        </Modal>
      )}

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

export default Header;

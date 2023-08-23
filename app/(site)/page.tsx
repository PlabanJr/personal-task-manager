"use client";

import Header from "@/components/Header";
import PageContent from "@/components/PageContent/PageContent";
import { Paths } from "@/core/constants/app";
import { TPath } from "@/core/types/app";
import { usePathname } from "next/navigation";
import { FC, useMemo } from "react";

type Props = {};

const Home: FC<Props> = () => {
  const pathname = usePathname();

  const currentPath: TPath = useMemo(() => {
    return (
      Paths.find((path: TPath) => path.href === pathname) ??
      Paths[0]
    );
  }, [pathname]);

  return (
    <div
      className="
        rounded-lg 
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
      "
    >
      <Header label={currentPath.label} />
      <div className="px-5 gap-x-4">
        <PageContent currentPath={currentPath} />
      </div>
    </div>
  );
};

export default Home;

"use client";

import TaskList from "@/components/TaskList";
import { TPath } from "@/core/types/app";

type PageContentProps = {
  currentPath: TPath;
};

const PageContent: React.FC<PageContentProps> = (props) => {
  const { currentPath } = props;

  return (
    <div className="flex flex-1 h-full">
      <TaskList filter={currentPath.routeKey} />
    </div>
  );
};

export default PageContent;

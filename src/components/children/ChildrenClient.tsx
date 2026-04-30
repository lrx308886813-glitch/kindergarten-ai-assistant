"use client";

import { ChildrenTable } from "@/components/children/ChildrenTable";
import { useWorkspace } from "@/components/providers/WorkspaceProvider";

export function ChildrenClient() {
  const { childProfiles } = useWorkspace();

  return <ChildrenTable childrenData={childProfiles} />;
}

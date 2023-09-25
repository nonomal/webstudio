import { useStore } from "@nanostores/react";
import {
  breakpointsStore,
  selectedBreakpointStore,
} from "@webstudio-is/sdk-plugin";
import { BreakpointsSelector } from "./breakpoints-selector";

export const BreakpointsSelectorContainer = () => {
  const breakpoints = useStore(breakpointsStore);
  const selectedBreakpoint = useStore(selectedBreakpointStore);
  if (selectedBreakpoint === undefined) {
    return null;
  }
  return (
    <BreakpointsSelector
      breakpoints={breakpoints}
      selectedBreakpoint={selectedBreakpoint}
    />
  );
};

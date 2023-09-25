import { PlayIcon } from "@webstudio-is/icons";
import { ToolbarToggleItem } from "@webstudio-is/design-system";
import { useIsPreviewMode } from "@webstudio-is/sdk-plugin";

export const PreviewButton = () => {
  const [isPreviewMode, setIsPreviewMode] = useIsPreviewMode();

  return (
    <ToolbarToggleItem
      value="preview"
      aria-label="Toggle Preview"
      variant="preview"
      data-state={isPreviewMode ? "on" : "off"}
      onClick={() => setIsPreviewMode(isPreviewMode === false)}
      tabIndex={0}
    >
      <PlayIcon />
    </ToolbarToggleItem>
  );
};

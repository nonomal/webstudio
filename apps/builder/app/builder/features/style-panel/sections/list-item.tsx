import { propertyDescriptions } from "@webstudio-is/css-data";
import type { StyleProperty } from "@webstudio-is/css-engine";
import { Grid, theme } from "@webstudio-is/design-system";
import { SelectControl } from "../controls";
import { StyleSection } from "../shared/style-section";
import { PropertyLabel } from "../property-label";

export const properties = ["listStyleType"] satisfies Array<StyleProperty>;

export const Section = () => {
  return (
    <StyleSection label="List Item" properties={properties}>
      <Grid gap={2} css={{ gridTemplateColumns: `1fr ${theme.spacing[21]}` }}>
        <PropertyLabel
          label="List Style Type"
          description={propertyDescriptions.listStyleType}
          properties={["listStyleType"]}
        />
        <SelectControl property="listStyleType" />
      </Grid>
    </StyleSection>
  );
};

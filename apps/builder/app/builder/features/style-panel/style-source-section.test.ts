import { enableMapSet } from "immer";
import { expect, test } from "@jest/globals";
import type { Breakpoint } from "@webstudio-is/sdk";
import type { WsComponentMeta } from "@webstudio-is/react-sdk";
import { registerContainers } from "@webstudio-is/sdk-plugin";
import {
  breakpointsStore,
  registeredComponentMetasStore,
  selectedInstanceSelectorStore,
  selectedStyleSourceSelectorStore,
  styleSourceSelectionsStore,
  styleSourcesStore,
} from "@webstudio-is/sdk-plugin";
import {
  $presetTokens,
  addStyleSourceToInstance,
} from "./style-source-section";

enableMapSet();
registerContainers();

test("generate Styles from preset tokens", () => {
  breakpointsStore.set(
    new Map<Breakpoint["id"], Breakpoint>([
      ["base", { id: "base", label: "Base" }],
    ])
  );
  registeredComponentMetasStore.set(
    new Map<string, WsComponentMeta>([
      [
        "Box",
        {
          icon: "",
          type: "container",
          presetTokens: {
            boxBright: {
              styles: [
                {
                  property: "color",
                  value: { type: "keyword", value: "black" },
                },
              ],
            },
          },
        },
      ],
      [
        "Button",
        {
          icon: "",
          type: "container",
          presetTokens: {
            buttonPrimary: {
              styles: [
                {
                  property: "backgroundColor",
                  value: { type: "keyword", value: "black" },
                },
              ],
            },
          },
        },
      ],
    ])
  );
  expect($presetTokens.get()).toEqual(
    new Map([
      [
        "Box:boxBright",
        {
          component: "Box",
          styleSource: {
            type: "token",
            id: "Box:boxBright",
            name: "Box Bright",
          },
          styles: [
            {
              breakpointId: "base",
              styleSourceId: "Box:boxBright",
              property: "color",
              value: { type: "keyword", value: "black" },
            },
          ],
        },
      ],
      [
        "Button:buttonPrimary",
        {
          component: "Button",
          styleSource: {
            type: "token",
            id: "Button:buttonPrimary",
            name: "Button Primary",
          },
          styles: [
            {
              breakpointId: "base",
              styleSourceId: "Button:buttonPrimary",
              property: "backgroundColor",
              value: { type: "keyword", value: "black" },
            },
          ],
        },
      ],
    ])
  );
});

test("add style source to instance", () => {
  selectedInstanceSelectorStore.set(["root"]);
  styleSourcesStore.set(new Map([["local1", { id: "local1", type: "local" }]]));
  styleSourceSelectionsStore.set(new Map());
  selectedStyleSourceSelectorStore.set(undefined);

  addStyleSourceToInstance("token1");
  expect(styleSourceSelectionsStore.get().get("root")).toEqual({
    instanceId: "root",
    values: ["token1"],
  });
  expect(selectedStyleSourceSelectorStore.get()).toEqual({
    styleSourceId: "token1",
  });

  // put new style source last
  addStyleSourceToInstance("local1");
  expect(styleSourceSelectionsStore.get().get("root")).toEqual({
    instanceId: "root",
    values: ["token1", "local1"],
  });

  // put new token before local
  addStyleSourceToInstance("token2");
  expect(styleSourceSelectionsStore.get().get("root")).toEqual({
    instanceId: "root",
    values: ["token1", "token2", "local1"],
  });
});

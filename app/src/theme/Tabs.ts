import { tabsAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

const enclosed = definePartsStyle({
  tab: {
    color: "blackAlpha.500",
    _selected: {
      color: "red.400",
    },
  },
});

export const tabsTheme = defineMultiStyleConfig({ variants: { enclosed } });

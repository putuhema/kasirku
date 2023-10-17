import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const filled = definePartsStyle({
  field: {
    border: "1px solid",
    _hover: {
      borderColor: "pink.400",
    },
    _focusVisible: {
      borderColor: "pink.400",
      boxShadow: "0 0 0 1px pink.400",
    },
  },
});

const outline = definePartsStyle({
  field: {
    border: "1px solid",
    _hover: {
      borderColor: "pink.400",
    },
    _focusVisible: {
      borderColor: "pink.400",
      boxShadow: "0 0 0 1px pink.400",
    },
  },
});

export const inputTheme = defineMultiStyleConfig({
  variants: { outline, filled },
});

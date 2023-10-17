import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const gradient = defineStyle({
  bgGradient: "linear(to-r, red.400,pink.400)",
  color: "white",
  _hover: {
    bgGradient: "linear(to-r, red.400,pink.400)",
    boxShadow: "xl",
  },
  w: "full",
  rounded: "full",
});

export const buttonTheme = defineStyleConfig({
  variants: { gradient },
});

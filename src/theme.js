import { theme } from "@chakra-ui/core";

const customTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      brand: {
        900: "#1a365d",
        800: "#153e75",
        700: "#2a69ac",
      },
    },
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
      "8xl": "6rem",
      "6rpw": "5vw",
    },
    sizes: {
      ...theme.space,
      full: "100%",
      "xxs": "5rem",
      "3xs": "14rem",
      "2xs": "16rem",
      xs: "20rem",
      sm: "24rem",
      md: "28rem",
      lg: "32rem",
      xl: "36rem",
      "2xl": "42rem",
      "3xl": "48rem",
      "4xl": "56rem",
      "5xl": "64rem",
      "6xl": "72rem",
    },
  };

  export default customTheme;
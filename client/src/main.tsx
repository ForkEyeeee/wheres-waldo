import React from "react";
import ReactDOM from "react-dom/client";
import RouterConfig from "./routes/router.tsx";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";

const theme = extendTheme({
  breakpoints: {
    base: "20em", // 320px
    sm: "30em", // 480px
    md: "48em", // 768px
    lg: "62em", // 992px
    xl: "80em", // 1280px
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterConfig />
    </ChakraProvider>
  </React.StrictMode>
);

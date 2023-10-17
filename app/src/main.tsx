import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "./pages/routes.tsx";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { buttonTheme, inputTheme, tabsTheme } from "@/theme";

const queryClient = new QueryClient();

const theme = extendTheme({
  components: {
    Button: buttonTheme,
    Tabs: tabsTheme,
    Input: inputTheme,
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ChakraProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>
);

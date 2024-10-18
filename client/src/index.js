import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { ProSidebarProvider } from "react-pro-sidebar";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ProSidebarProvider>
    <ChakraProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </ProSidebarProvider>
);

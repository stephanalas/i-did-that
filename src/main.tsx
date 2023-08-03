import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
          defaultGradient: { from: "blue", to: "purple", deg: 20 },
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          colors: {
            gray: [
              "#F2F2F2",
              "#DBDBDB",
              "#C4C4C4",
              "#ADADAD",
              "#969696",
              "#808080",
              "#666666",
              "#4D4D4D",
              "#333333",
              "#1A1A1A",
            ],
            orange: [
              "#FEEFE7",
              "#FBD3BC",
              "#F8B690",
              "#F69A65",
              "#F37D3A",
              "#F1610E",
              "#C14E0B",
              "#903A09",
              "#602706",
              "#301303",
            ],
            green: [
              "#F0F9EB",
              "#D4EEC8",
              "#B8E4A5",
              "#9DD982",
              "#81CE5F",
              "#65C33C",
              "#519C30",
              "#3D7524",
              "#294E18",
              "#14270C",
            ],
            purple: [
              "#F2EFF6",
              "#D9D1E5",
              "#C1B4D5",
              "#A997C4",
              "#917AB3",
              "#795CA3",
              "#614A82",
              "#493762",
              "#302541",
              "#181221",
            ],
            blue: [
              "#ECF1F9",
              "#C9D9ED",
              "#A7C1E2",
              "#84A8D7",
              "#6290CB",
              "#3F77C0",
              "#336099",
              "#264873",
              "#19304D",
              "#0D1826",
            ],
          },
          primaryColor: "blue",
        }}
      >
        <App />
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

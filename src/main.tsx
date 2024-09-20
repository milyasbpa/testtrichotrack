import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./core/utils/react_query";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./core/modules/app/context/App.context.tsx";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <Suspense>
        <BrowserRouter>
          <AppProvider>
            <App />
          </AppProvider>
        </BrowserRouter>
      </Suspense>
    </StrictMode>
  </QueryClientProvider>
);

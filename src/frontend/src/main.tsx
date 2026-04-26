import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PhantomContextProvider } from "./contexts/phantom-context";
import { initializeCanisterEnv } from "./lib/canister-env";
import "./index.css";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

async function bootstrap() {
  await initializeCanisterEnv();

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <PhantomContextProvider>
        <App />
      </PhantomContextProvider>
    </QueryClientProvider>,
  );
}

void bootstrap();

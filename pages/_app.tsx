// pages/_app.js
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/global.css";
import Header from "@/components/Header";
import { RecoilRoot } from "recoil";
function MyApp({ Component, pageProps }: any) {
  const queryClient: QueryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <div style={{ display: "flex" }}>
          <Header />
          <Component {...pageProps} />
        </div>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;

import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import {
  scrollSepolia,
  optimismSepolia,
  sepolia,
  lineaTestnet,
  mainnet,
  optimism,
  polygon,
  localhost
} from 'wagmi/chains';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';

const config = getDefaultConfig({
  appName: 'Fire Post',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    sepolia,
    scrollSepolia,
    optimismSepolia,
    lineaTestnet,
    mainnet,
    polygon,
    optimism,
    localhost
  ],
  ssr: true,
});

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider>
          <Header/>
          <Component {...pageProps} />
          <Footer />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;

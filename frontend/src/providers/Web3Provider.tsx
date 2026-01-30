"use client";

import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";

const celoSepolia = {
    id: 11142220,
    name: 'Celo Sepolia',
    nativeCurrency: { name: 'Celo', symbol: 'CELO', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://celo-sepolia.drpc.org'] },
    },
    blockExplorers: {
        default: { name: 'Celo Explorer', url: 'https://sepolia.celoscan.io' },
    },
    testnet: true,
} as const;

const config = getDefaultConfig({
    appName: 'Mazatlán Hotel App',
    projectId: 'YOUR_PROJECT_ID', // TODO: User needs to get this from WalletConnect
    chains: [celoSepolia],
    ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";
import coinsbaseModule from "@web3-onboard/coinbase";
import dcentModule from "@web3-onboard/dcent";
import walletConnectModule from "@web3-onboard/walletconnect";
import fortmaticModule from "@web3-onboard/fortmatic";
import portisModule from "@web3-onboard/portis";
import logo from "../img/logo_white.b1858a79.svg";
// import { Alchemy, Network, Wallet, Utils } from "alchemy-sdk";

const infuraKey = process.env.REACT_APP_INFURA_KEY;
const fortmaticApiKey = process.env.REACT_APP_FORTMATIC_API_KEY;
const portisApiKey = process.env.REACT_APP_PORTIS_API_KEY;


const injected = injectedModule();
const coinbase = coinsbaseModule();
const dcent = dcentModule();
const walletConnect = walletConnectModule();

const fortmatic = fortmaticModule({
  apiKey: fortmaticApiKey,
});

const portis = portisModule({
  apiKey: portisApiKey,
});

const MAINNET_RPC_URL = `https://mainnet.infura.io/v3/${infuraKey}`;

const web3onboard = init({
  wallets: [injected, coinbase, dcent, walletConnect, fortmatic, portis],
  chains: [
    {
      id: "0x1",
      token: "ETH",
      label: "Ethereum Mainnet",
      rpcUrl: MAINNET_RPC_URL,
    },
    {
      id: "56",
      token: "BNB",
      label: "BNB Mainnet",
      rpcUrl: MAINNET_RPC_URL,
    },
  ],
  appMetadata: {
    name: "BakerySwap",
    icon: logo,
    description: "BakeySwap App",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
    ],
  },
  accountCenter: {
    desktop: {
      position: "bottomRight",
      enabled: true,
      minimal: true,
    },
    mobile: {
      position: "bottomRight",
      enabled: true,
      minimal: true,
    },
  },
});

export const Connectwallet = ({ wallet, connect, connecting }) => {
  //  const connectedWallets = useWallets();

  const connectWallet = async () => {
    connect();
  };

  /*----------Disconnect Wallet----------*/

  const [primaryWallet] = web3onboard.state.get().wallets;

  const disconnectWallet = async () => {
    web3onboard.disconnectWallet({
      label: primaryWallet.label,
    });
  };

  if (!wallet?.accounts[0].address) {
    return (
      <div>
        <button className="connect-btn" onClick={() => connectWallet()}>
          <p className="connect-wallet">Connect Wallet</p>
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button className="connect-btn" onClick={() => disconnectWallet()}>
          <p className="connect-wallet">Disconnect</p>
        </button>
      </div>
    );
  }
};

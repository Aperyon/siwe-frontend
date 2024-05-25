import { BrowserProvider } from "ethers";
import { SiweMessage } from "siwe";
import { BACKEND_URL } from "./variables";

const domain = window.location.host;
const origin = window.location.origin;

let provider: BrowserProvider | null = null;
try {
  // @ts-ignore
  provider = new BrowserProvider(window.ethereum);
} catch {
  console.log(
    "Not having `window.ethereum` is already handled in `<MetaMask />`",
  );
}

let address: string | null = null;

export async function createSiweMessage(address: string, statement: string) {
  const res = await fetch(`${BACKEND_URL}/nonce`, { credentials: "include" });
  const siweMessage = new SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: "1",
    chainId: 1,
    nonce: await res.text(),
  });
  return siweMessage.prepareMessage();
}

export function connectWallet() {
  if (!provider) return;

  const command = "eth_requestAccounts";
  provider.send(command, []).catch(() => console.log("user rejected request"));
}

export async function signInWithEtherum() {
  if (!provider) return;

  const signer = await provider.getSigner();
  address = await signer.getAddress();

  const message = await createSiweMessage(
    address,
    "Sign in with Ethereum to the app.",
  );
  const signature = await signer.signMessage(message);

  const res = await fetch(`${BACKEND_URL}/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, signature }),
    credentials: "include",
  });

  return res;
}

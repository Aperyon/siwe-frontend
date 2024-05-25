import MetaMask from "./components/MetaMask";
import Profile from "./components/Profile";
import { useAuth } from "./auth";
import { Button } from "./ui/Button";
import { connectWallet } from "./siwe";

export default function App() {
  const { loggedInUser, login } = useAuth();
  function onConnectWalletClick() {
    connectWallet();
  }

  function onSiweClick() {
    login();
  }

  return (
    <div className="p-4">
      <MetaMask />
      {loggedInUser && <Profile />}
      <div className="flex space-x-4">
        <Button onClick={onConnectWalletClick}>Connect Wallet</Button>
        <Button onClick={onSiweClick}>Sign in with Ethereum</Button>
      </div>
    </div>
  );
}

import MetaMask from "./components/MetaMask";
import Profile from "./components/Profile";
import { useAuth } from "./auth";
import { Button } from "./ui/Button";
import { connectWallet } from "./siwe";
import PostCreateForm from "./components/PostCreateForm";
import PostList from "./components/PostList";

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
      {loggedInUser && (
        <div>
          <Profile />
          <PostCreateForm />
          <PostList />
        </div>
      )}
      <div className="flex space-x-4">
        <Button onClick={onConnectWalletClick}>Connect Wallet</Button>
        <Button onClick={onSiweClick}>Sign in with Ethereum</Button>
      </div>
    </div>
  );
}

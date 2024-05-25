import { useAuth } from "../auth";
import { Button } from "../ui/Button";

export default function LogoutButton() {
  const { logout } = useAuth();

  function onLogoutClick() {
    logout();
  }

  return <Button onClick={onLogoutClick}>Logout</Button>;
}

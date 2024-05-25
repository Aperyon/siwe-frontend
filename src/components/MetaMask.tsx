export default function MetaMask() {
  if (window.ethereum) return null;

  return (
    <h1 className="bg-orange-500 text-white">
      Plase make sure the MetaMask Google Chrome browser extension is installed
      <a
        className="text-blue-500 ml-4"
        href="https://metamask.io/download/"
        target="_blank"
      >
        Download here
      </a>
    </h1>
  );
}

import { useEffect, useState } from "react";

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log("User response:", outcome);
    setDeferredPrompt(null);
  };

  return (
    deferredPrompt && (
      <button
        onClick={handleInstall}
        className="px-4 py-2 bg-emerald-600 text-white rounded-lg shadow-md"
      >
        📥 Install App
      </button>
    )
  );
}

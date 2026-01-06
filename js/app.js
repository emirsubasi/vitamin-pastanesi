window.addEventListener('load', () => {
  const installBtn = document.getElementById("installBtn");
  let deferredPrompt;

  // beforeinstallprompt eventini yakala
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();        // otomatik promptu engelle
    deferredPrompt = e;        // ileride kullanılmak üzere sakla
    installBtn.style.display = 'block'; // butonu göster
  });

  // Install butonuna tıklandığında prompt göster
  installBtn.addEventListener("click", async () => {
    installBtn.style.display = 'none';
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      console.log('User choice:', choice.outcome); // accepted / dismissed
      deferredPrompt = null;
    }
  });

  // Service Worker kaydı
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js")
      .then(reg => console.log("Service Worker Registered:", reg))
      .catch(err => console.error("SW registration failed:", err));
  }
});

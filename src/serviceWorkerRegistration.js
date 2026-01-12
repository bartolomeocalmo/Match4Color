// src/serviceWorkerRegistration.js

// Questo file registra un service worker per rendere la webapp offline-friendly
// e cache dei file statici, utile per trasformarla in una PWA.

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  if ("serviceWorker" in navigator) {
    const publicUrl = new URL(import.meta.env.BASE_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Se la origin è diversa, non registrare il service worker
      return;
    }

    window.addEventListener("load", () => {
      const swUrl = `${import.meta.env.BASE_URL}service-worker.js`;

      if (isLocalhost) {
        // Controllo per localhost
        checkValidServiceWorker(swUrl, config);

        navigator.serviceWorker.ready.then(() => {
          console.log("Service worker pronto e la webapp è offline-ready.");
        });
      } else {
        // Registra direttamente su produzione
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              // Nuovo contenuto disponibile
              console.log(
                "Nuovo contenuto disponibile, refresh per aggiornare."
              );
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // Contenuto cache iniziale
              console.log(
                "Contenuto cached per la prima volta, offline disponibile."
              );
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error("Errore nella registrazione del service worker:", error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  fetch(swUrl, {
    headers: { "Service-Worker": "script" },
  })
    .then((response) => {
      const contentType = response.headers.get("content-type");
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf("javascript") === -1)
      ) {
        // Nessun service worker trovato, reset
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker valido
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        "Nessuna connessione, la webapp funzionerà offline se già caricata."
      );
    });
}

// Funzione per deregistrare il service worker (opzionale)
export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

import React from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../PageTransition";

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="container">
        <button
          className="back-button"
          onClick={() => navigate("/")}
          style={{ marginBottom: "20px" }}
        >
          ← Torna alla Home
        </button>
        <h1>Match4Color - Privacy Policy</h1>
        <p>
          La tua privacy è importante per noi. In questa pagina spieghiamo quali
          dati raccogliamo, come li utilizziamo e come puoi esercitare i tuoi
          diritti.
        </p>

        <h2>1. Raccolta dei dati</h2>
        <p>
          Raccogliamo solo le informazioni necessarie per il funzionamento
          dell’app, come:
        </p>
        <ul>
          <li>Colore selezionato per generare palette</li>
          <li>Tipologia di capo e stile scelti dall’utente</li>
          <li>Outfit salvati nel tuo browser (localStorage)</li>
        </ul>

        <h2>2. Cookie e tecnologie simili</h2>
        <p>
          Match4Color utilizza tecnologie per migliorare l’esperienza utente:
        </p>
        <ul>
          <li>LocalStorage per salvare i tuoi outfit</li>
          <li>Cookie tecnici per funzionalità essenziali dell’app</li>
        </ul>

        <h2>3. Annunci e terze parti</h2>
        <p>
          Per mostrare annunci utilizziamo Google AdSense. Google può
          raccogliere dati in base alle proprie policy. Per maggiori
          informazioni visita il sito ufficiale di{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google AdSense
          </a>
          .
        </p>

        <h2>4. Conservazione dei dati</h2>
        <p>
          I dati raccolti vengono memorizzati localmente sul tuo dispositivo e
          non vengono inviati a server esterni, fatta eccezione per l’uso degli
          annunci di terze parti.
        </p>

        <h2>5. Diritti dell’utente</h2>
        <p>
          Puoi cancellare gli outfit salvati in qualsiasi momento. Non
          raccogliamo dati personali sensibili senza il tuo consenso.
        </p>

        <p style={{ marginTop: "20px", fontSize: "0.9rem", opacity: 0.8 }}>
          Aggiornata al 13 gennaio 2026
        </p>
      </div>
    </PageTransition>
  );
}

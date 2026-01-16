import React from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../PageTransition";

export default function Terms() {
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
        <h1>Match4Color - Termini e Condizioni</h1>
        <p>
          Benvenuto su Match4Color! Utilizzando la nostra app accetti di
          rispettare questi termini. Ti invitiamo a leggere attentamente.
        </p>

        <h2>1. Uso dell’app</h2>
        <p>
          L’app è fornita “così com’è” e può essere utilizzata per generare
          palette di colori e salvare outfit. Non ci assumiamo responsabilità
          per eventuali errori o malfunzionamenti.
        </p>

        <h2>2. Proprietà dei contenuti</h2>
        <p>
          Tutti i contenuti, inclusi i colori generati e le combinazioni
          proposte, appartengono a Match4Color. Puoi usare le palette per uso
          personale, ma non riprodurle o distribuirle a scopo commerciale senza
          autorizzazione.
        </p>

        <h2>3. Account e dati</h2>
        <p>
          L’app non richiede account. Tutti i dati degli outfit salvati vengono
          memorizzati localmente nel tuo browser. Non raccogliamo dati personali
          sensibili senza il tuo consenso.
        </p>

        <h2>4. Annunci e terze parti</h2>
        <p>
          L’app può mostrare annunci tramite terze parti (es. Google AdSense).
          Queste terze parti possono raccogliere dati in base alle proprie
          policy. Per maggiori informazioni, visita il sito ufficiale di{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google AdSense
          </a>
          .
        </p>

        <h2>5. Limitazioni e responsabilità</h2>
        <p>
          Match4Color non è responsabile per eventuali perdite di dati,
          malfunzionamenti del browser o problemi derivanti dall’uso dell’app.
        </p>

        <h2>6. Modifiche ai termini</h2>
        <p>
          Ci riserviamo il diritto di aggiornare questi termini in qualsiasi
          momento. La versione aggiornata sarà disponibile su questa pagina.
        </p>

        <p style={{ marginTop: "20px", fontSize: "0.9rem", opacity: 0.8 }}>
          Aggiornato al 13 gennaio 2026.
        </p>
      </div>
    </PageTransition>
  );
}

# Client di Test per API di Autenticazione

Questo client è stato creato per testare le funzionalità dell'API di autenticazione. Permette di registrare nuovi utenti, effettuare il login e visualizzare il profilo utente.

## Funzionalità

- Registrazione utente
- Login utente
- Visualizzazione profilo utente
- Verifica dello stato dell'API

## Requisiti

- Node.js (versione 14 o superiore)
- npm (incluso con Node.js)

## Installazione

1. Assicurati che il server API sia in esecuzione (nella cartella principale del progetto)
2. Naviga nella cartella `client`
3. Installa le dipendenze:

```bash
npm install
```

## Avvio dell'applicazione

Per avviare l'applicazione in modalità sviluppo:

```bash
npm run dev
```

L'applicazione sarà disponibile all'indirizzo [http://localhost:5173](http://localhost:5173)

## Build per la produzione

Per creare una build ottimizzata per la produzione:

```bash
npm run build
```

I file generati saranno disponibili nella cartella `dist`.

## Note

- Il client è configurato per comunicare con l'API in esecuzione su http://localhost:8080
- Assicurati che il server API sia in esecuzione prima di utilizzare il client
- Puoi verificare lo stato dell'API dalla pagina "Stato API" nel client
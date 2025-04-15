# API di Autenticazione

Questo progetto implementa un'API RESTful per la gestione dell'autenticazione degli utenti, utilizzando Node.js, Express e MongoDB.

## Caratteristiche

- Registrazione utenti
- Login e autenticazione con JWT
- Protezione delle rotte con middleware di autenticazione
- Gestione profilo utente

## Requisiti

- Node.js (v12 o superiore)
- MongoDB

## Installazione

1. Clona il repository

```bash
git clone <url-repository>
cd auth-api
```

2. Installa le dipendenze

```bash
npm install
```

3. Configura le variabili d'ambiente

Crea un file `.env` nella root del progetto con le seguenti variabili:

```
MONGO_URI=mongodb://localhost:27017/auth-api
JWT_SECRET=auth_api_secret_key
PORT=8080
NODE_ENV=development
```

4. Avvia il server

```bash
# Modalità sviluppo
npm run dev

# Modalità produzione
npm start
```

## Struttura del Progetto

```
├── config/
│   └── db.js           # Configurazione connessione MongoDB
├── middleware/
│   └── auth.js         # Middleware per autenticazione JWT
├── models/
│   └── User.js         # Schema e modello utente
├── routes/             # Definizione delle rotte API
├── .env                # Variabili d'ambiente
├── package.json        # Dipendenze e script
└── server.js           # Entry point dell'applicazione
```

## API Endpoints

### Autenticazione

#### Registrazione Utente

```
POST /api/users/register
```

Body:
```json
{
  "username": "esempio",
  "email": "esempio@email.com",
  "password": "password123"
}
```

Risposta:
```json
{
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "username": "esempio",
    "email": "esempio@email.com"
  }
}
```

#### Login Utente

```
POST /api/users/login
```

Body:
```json
{
  "email": "esempio@email.com",
  "password": "password123"
}
```

Risposta:
```json
{
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "username": "esempio",
    "email": "esempio@email.com"
  }
}
```

### Utenti

#### Ottieni Profilo Utente

```
GET /api/users/me
```

Header:
```
x-auth-token: jwt-token
```

Risposta:
```json
{
  "id": "user-id",
  "username": "esempio",
  "email": "esempio@email.com",
  "createdAt": "2023-05-01T12:00:00.000Z"
}
```

## Sicurezza

L'API utilizza:
- JWT (JSON Web Tokens) per l'autenticazione
- bcryptjs per l'hashing delle password
- Validazione degli input con express-validator

## Licenza

MIT
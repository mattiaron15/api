// Utility per gestire l'autenticazione

// Imposta il token di autenticazione nell'header delle richieste
export const setAuthToken = (token) => {
  if (token) {
    // Se il token esiste, lo aggiungiamo all'header di tutte le richieste
    window.localStorage.setItem('token', token);
  } else {
    // Se il token non esiste, lo rimuoviamo dall'header
    window.localStorage.removeItem('token');
  }
};

// Verifica se l'utente è autenticato
export const isAuthenticated = () => {
  return localStorage.getItem('token') ? true : false;
};

// Ottieni il token dall'localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};
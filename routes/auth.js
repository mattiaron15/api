const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   POST /api/auth/register
// @desc    Registra un nuovo utente
// @access  Public
router.post('/register', [
  check('username', 'Username è obbligatorio').not().isEmpty(),
  check('email', 'Inserisci un indirizzo email valido').isEmail(),
  check('password', 'Inserisci una password con almeno 6 caratteri').isLength({ min: 6 })
], async (req, res) => {
  // Validazione input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    // Verifica se l'utente esiste già
    let userByEmail = await User.findOne({ email });
    if (userByEmail) {
      return res.status(400).json({ msg: 'Utente con questa email già esistente' });
    }

    let userByUsername = await User.findOne({ username });
    if (userByUsername) {
      return res.status(400).json({ msg: 'Username già in uso' });
    }

    // Crea nuovo utente
    const user = new User({
      username,
      email,
      password
    });

    // Cripta la password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Salva l'utente nel database
    await user.save();

    // Crea il payload JWT
    const payload = {
      user: {
        id: user.id
      }
    };

    // Genera il token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Errore del server');
  }
});

// @route   POST /api/auth/login
// @desc    Autentica utente e ottiene token
// @access  Public
router.post('/login', [
  check('email', 'Inserisci un indirizzo email valido').isEmail(),
  check('password', 'Password richiesta').exists()
], async (req, res) => {
  // Validazione input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Verifica se l'utente esiste
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Credenziali non valide' });
    }

    // Verifica la password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenziali non valide' });
    }

    // Crea il payload JWT
    const payload = {
      user: {
        id: user.id
      }
    };

    // Genera il token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Errore del server');
  }
});

// @route   GET /api/auth/me
// @desc    Ottieni informazioni utente
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    // Ottieni l'utente dal database (escludi la password)
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'Utente non trovato' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Errore del server');
  }
});

module.exports = router;
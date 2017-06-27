const pgp = require('pg-promise')();

// Database connection.
const db = pgp(`postgres://postgres:pass@localhost:5432/postgres`);

module.exports = db;
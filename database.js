process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';

const pgp = require("pg-promise")({
    connect(client) {
      console.log("Connected to database:", client.connectionParameters.database);
    },
  
    disconnect(client) {
      console.log(
        "Disconnected from database:",
        client.connectionParameters.database
      );
    },
});

let secrets = require('./secrets.json');
let username = secrets.username;
let password = secrets.password;

let url = `postgres://${username}:${password}@ec2-54-87-34-201.compute-1.amazonaws.com:5432/d2t1ehpcp5iq2?sslmode=require`;

const db = pgp(url);

async function connectAndRun(task) {
    let connection = null;
  
    try {
      connection = await db.connect();
      return await task(connection);
    } catch (e) {
      // eslint-disable-next-line no-useless-catch
      throw e;
    } finally {
      try {
        connection.done();
      } catch (ignored) {
        // eslint-disable-next-line no-empty
      }
    }
}

// Database functions for log in 
async function addUser(firstname, lastname, email, password) {
    return await connectAndRun((db) =>
      db.none(
        "INSERT INTO managers (firstname, lastname, email, password) VALUES ($1, $2, $3, $4);",
        [firstname, lastname, email, password]
      )
    );
}

module.exports = {
addUser
};
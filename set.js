const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'HACKING-MD;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaVB2K2tRQ3R5VmU2TTUzeHM1TEk4OHJwbis5V0hBY0FXK3RVZW96RFhsWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiblBhRWdtQ2FRMGF2YmEyWXJ1TzVQMEM5Q2Y1UTBGb2dzL1ZmWUVZTzB4RT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBQWh1OW8xcFZrNHZKS2RERlVtc0hsOFBYSE42OXVDb2pmY1MwQ1RPYVU4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxdFRMYTErb3h1S0JaLzhwcE9hSzgxTlQyUzNQSUE4M3pXQmtUQzRxZWxvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldLTUEzR1k2RE9ha1lhTWlUeXhRT3I3UXZ6eGxOZXRmS1BvK2d0TE8wVUE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjlGYkNCSHJXMU5kamJ2UDYyZXI4QjJPeWNISXllbUpORmQ0UWZwTWorWFk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0gxUit1VUdlTkdrRk5QQU5OeVhiZXUwZ2RsL2sxUGhzcGl0ZU94cTJuYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQWJEalZ3c2JpdDNBUTNRSGtoQ1BVRUdZazZ6Q1hOQmk4bXpVK3VOcGlsST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdIbVQwLzJkNmJmcGpIcHNnSnBPZnlZQ1h5cVRFVzVaV3lQSXJsNUVNSVRxTWVnemtuREp2M0haRVV6NFd6L01Xdk1kY3h6RzRWOGNWdlNiVnpWemdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI4LCJhZHZTZWNyZXRLZXkiOiJkWVNLTVRIdzM0cHBwbmRxUnZzYmE1MWhqeEg5aWVxeUNNWjgwNnpha1MwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJMMy1vQlB0bVJreW9MTThGNzdJRi1BIiwicGhvbmVJZCI6IjgxNTkyY2UyLWJmNjctNDM2NS1hODg2LWMxYTgwMGVhNzFhMiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrYWZ0Mk1lYnNSM3RWc1pXTHQ4eHhpZDZpYXc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ2VkVHJwem1XTE9ZN2s1KzRmUFdSWE5Gc3JrPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjNOM0VGSFI2IiwibWUiOnsiaWQiOiIyMTI3MjIwNTUwMTE6NDJAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0luZnhmRUdFSTZDMzdRR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ik0xRytmc2MvZDdmb2I2SWtRZkZGcjBhWVFOSElJSVlVTExmbGp0V1J3MjQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImthMUV4Y1ROQUc4UGpRM0txSFF6SHdGME01d1lScTJhUU9WT29KTnVRWTMrNTZ4cGNmNmRDMjEwSFZHQ1ljdUNGQ1ROOTc3V3VFd1VpWGJ4ZkxJZEN3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJjd1kxckJzeWczM0VyaGp3YXAvN0M2SkpXMC9nQitzRmttbmlNZForbFZrR2F3VStqWThyUXJRc2JEaTRkQXpFMXh3SW9BZThONDAzK0E2SCtzMUdpdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIxMjcyMjA1NTAxMTo0MkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUTlJ2bjdIUDNlMzZHK2lKRUh4UmE5R21FRFJ5Q0NHRkN5MzVZN1ZrY051In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxMjIxNDA0LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUhOTSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "YouGalax",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "212722055011",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'Mbots Gold',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2024/07/1720315191-780df9f957e79f37e365afd01fe85815-768x432.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   DB: process.env.DB || 'postgres://neoverse:pomrleUMXwlmlpIcW2oFJmMX0CXzaFkf@dpg-combonun7f5s73d7uoog-a.oregon-postgres.render.com/neoverse_wz98',
                  /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

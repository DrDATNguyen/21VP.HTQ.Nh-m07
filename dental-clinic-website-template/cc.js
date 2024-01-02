var config = require('./dbConfig');
const sql = require('msnodesqlv8');

async function getLoginDetails() {
  return new Promise((resolve, reject) => {
    sql.query(config, "select * from Users", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  }).catch((error) => {
    console.error("Error in getLoginDetails:", error);
    throw error; // Re-throw the error to maintain the unhandled rejection
  });
}
module.exports = {
  getLoginDetails: getLoginDetails
};

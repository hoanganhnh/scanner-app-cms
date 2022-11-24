module.exports = {
  /**
   * Simple example.
   * Every monday at 1am.
   */

  /* \[SECOND (optional)\] [MINUTE] \[HOUR\] [DAY OF MONTH] \[MONTH OF YEAR\] [DAY OF WEEK] */
  "0 0 1 * * 1": ({ strapi }) => {
    // Add your own logic here (e.g. send a queue of email, create a database backup, etc.).
  },
};

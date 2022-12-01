const formatCurrentDate = require("../src/utils/time");
const { handleSendNotification } = require("../src/utils/notification");

module.exports = {
  /**
   * Simple example.
   * Every monday at 1am.
   */

  /* \[SECOND (optional)\] [MINUTE] \[HOUR\] [DAY OF MONTH] \[MONTH OF YEAR\] [DAY OF WEEK] */
  // send expire date product
  pushNotificationExpireDateProduct: {
    task: async ({ strapi }) => {
      const products = await strapi.db.query("api::product.product").findMany({
        where: {
          expireDate: {
            $eq: formatCurrentDate(),
          },
        },
      });
      const productInfors = await Promise.all(
        products.map(async (product) => {
          const token = await strapi.db
            .query("api::token-device.token-device")
            .findOne({
              where: {
                userId: {
                  $eq: product.userId,
                },
              },
            });
          return {
            name: product.name,
            tokenDevice: token.token,
          };
        })
      );

      for (const product of productInfors) {
        await handleSendNotification(
          product.tokenDevice,
          "Expire product",
          `Product ${product.name} is expired !`
        );
      }
    },
    options: {
      rule: "*/2 * * * *",
    },
  },
};

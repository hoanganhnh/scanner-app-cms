"use strict";

const { handleSendNotification } = require("../../../utils/notification");

/**
 * notification controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::notification.notification",
  ({ strapi }) => ({
    async create(ctx) {
      // some logic here
      const response = await super.create(ctx);
      const { data } = response;
      const tokenDevice = await strapi.db
        .query("api::token-device.token-device")
        .findOne({
          where: {
            userId: data.attributes.userId,
          },
        });
      handleSendNotification(
        tokenDevice.token,
        data.attributes.title,
        data.attributes.body,
        // { url: `product/${data.attributes.productId}` }
        { url: `product/${data.attributes.productId}` }
      );

      return data;
    },
  })
);

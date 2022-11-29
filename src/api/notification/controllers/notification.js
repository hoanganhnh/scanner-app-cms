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
      // @todo: hanle respone and interact respond in UI
      // some more logic
      // const product = await strapi.db.query("api::product.product").findOne({
      //   where: {
      //     id: data.attributes.productId,
      //   },
      // });
      handleSendNotification(
        tokenDevice.token,
        "default",
        data.attributes.title,
        data.attributes.body,
        // { url: `product/${data.attributes.productId}` }
        { url: `product/${data.attributes.productId}` }
      );

      return data;
    },
  })
);

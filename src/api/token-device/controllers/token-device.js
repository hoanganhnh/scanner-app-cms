"use strict";

/**
 * token-device controller
 */
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::token-device.token-device",
  ({ strapi }) => ({
    async create(ctx) {
      // some logic here
      const response = await super.create(ctx);
      // some more logic

      return response;
    },
  })
);

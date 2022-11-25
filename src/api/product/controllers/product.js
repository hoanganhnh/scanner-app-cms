"use strict";

const cloudinary = require("cloudinary").v2;

/**
 * product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  delete: async (ctx) => {
    try {
      // for api /api/products:id
      const { id } = ctx.params;
      const entity = await strapi.services["api::product.product"].delete(id, {
        populate: {
          image: true,
        },
      });
      await cloudinary.uploader.destroy(
        entity.image.provider_metadata.public_id,
        entity.image.provider_metadata.resource_type
      );
      await cloudinary.uploader.destroy(
        entity.image.formats.thumbnail.provider_metadata.public_id,
        entity.image.formats.thumbnail.provider_metadata.resource_type
      );

      return { message: "successfull" };
    } catch (error) {
      console.log(error);
      return error;
    }
  },
}));

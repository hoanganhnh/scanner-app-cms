'use strict';

/**
 * favorites-product service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::favorites-product.favorites-product');

'use strict';

/**
 * product-base service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::product-base.product-base');

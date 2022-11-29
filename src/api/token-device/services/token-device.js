'use strict';

/**
 * token-device service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::token-device.token-device');

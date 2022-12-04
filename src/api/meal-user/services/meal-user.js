'use strict';

/**
 * meal-user service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::meal-user.meal-user');

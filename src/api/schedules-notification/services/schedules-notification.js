'use strict';

/**
 * schedules-notification service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::schedules-notification.schedules-notification');

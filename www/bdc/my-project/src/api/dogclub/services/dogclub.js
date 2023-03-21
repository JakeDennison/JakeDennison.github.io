'use strict';

/**
 * dogclub service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::dogclub.dogclub');

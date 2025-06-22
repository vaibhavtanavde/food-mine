const { test: base, expect } = require('@playwright/test');

const randomSuffix = Math.floor(Math.random() * 100000);
const uniqueEmail = `testuser+${randomSuffix}@example.com`;

exports.test = base.extend({
  testEmail: async ({}, use) => {
    await use(uniqueEmail);
  },
});

exports.expect = expect; // ✅ Re-export expect

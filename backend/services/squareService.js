const { Client, Environment } = require('square');

function getSquareClient() {
  if (!process.env.SQUARE_ACCESS_TOKEN) return null;
  return new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: process.env.SQUARE_ENV === 'production' ? Environment.Production : Environment.Sandbox
  });
}

async function createPayment({ sourceId, amount, idempotencyKey }) {
  const client = getSquareClient();
  if (!client) {
    return { fallback: true, message: 'Square key not configured. Payment mocked for development.' };
  }

  const { result } = await client.paymentsApi.createPayment({
    sourceId,
    idempotencyKey,
    amountMoney: { amount, currency: 'USD' }
  });

  return result;
}

module.exports = { createPayment };

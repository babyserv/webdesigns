const express = require('express');
const crypto = require('crypto');
const { requireAuth } = require('../middleware/auth');
const Payment = require('../models/Payment');
const { createPayment } = require('../services/squareService');

const router = express.Router();

router.post('/one-time', requireAuth, async (req, res) => {
  const { sourceId, amount, projectId } = req.body;
  const squareResult = await createPayment({
    sourceId,
    amount,
    idempotencyKey: crypto.randomUUID()
  });

  const payment = await Payment.create({
    client: req.user._id,
    project: projectId,
    amount,
    paymentType: 'one_time',
    squarePaymentId: squareResult?.payment?.id || '',
    status: squareResult?.payment?.status || (squareResult.fallback ? 'mocked' : 'pending')
  });

  res.json({ payment, squareResult });
});

router.post('/subscription', requireAuth, async (req, res) => {
  const { amount, projectId } = req.body;
  const payment = await Payment.create({
    client: req.user._id,
    project: projectId,
    amount,
    paymentType: 'subscription',
    status: 'pending_setup'
  });

  res.json({ message: 'Subscription intent recorded. Connect Square subscriptions workflow.', payment });
});

module.exports = router;

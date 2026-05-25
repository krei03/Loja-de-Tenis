const supportedMethods = new Set(['credit', 'pix'])

export async function createPaymentIntent({ amount, method, orderId }) {
  const normalizedMethod = supportedMethods.has(method) ? method : 'credit'

  return {
    amount: Number(amount || 0),
    currency: 'BRL',
    method: normalizedMethod,
    provider: process.env.PAYMENT_PROVIDER || 'manual',
    provider_reference: `${orderId}-${normalizedMethod}`,
    status: process.env.PAYMENT_PROVIDER ? 'pending' : 'manual_review',
  }
}

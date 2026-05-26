import { createHmac, pbkdf2Sync, randomBytes, timingSafeEqual } from 'node:crypto'

const HASH_ITERATIONS = 120000
const HASH_KEY_LENGTH = 64
const HASH_DIGEST = 'sha512'

function getTokenSecret() {
  return process.env.CUSTOMER_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET || 'vertex-local-customer-secret'
}

function sign(value) {
  return createHmac('sha256', getTokenSecret()).update(value).digest('base64url')
}

export function createCustomerPasswordHash(password) {
  const salt = randomBytes(16).toString('hex')
  const hash = pbkdf2Sync(password, salt, HASH_ITERATIONS, HASH_KEY_LENGTH, HASH_DIGEST).toString('hex')

  return `pbkdf2$${HASH_ITERATIONS}$${salt}$${hash}`
}

export function verifyCustomerPassword(password, storedHash = '') {
  const [algorithm, iterations, salt, expectedHash] = String(storedHash).split('$')

  if (algorithm !== 'pbkdf2' || !iterations || !salt || !expectedHash) {
    const passwordBuffer = Buffer.from(String(password))
    const storedBuffer = Buffer.from(String(storedHash))

    return storedBuffer.length > 0
      && storedBuffer.length === passwordBuffer.length
      && timingSafeEqual(storedBuffer, passwordBuffer)
  }

  const actualHash = pbkdf2Sync(password, salt, Number(iterations), HASH_KEY_LENGTH, HASH_DIGEST)
  const expectedBuffer = Buffer.from(expectedHash, 'hex')

  return expectedBuffer.length === actualHash.length && timingSafeEqual(expectedBuffer, actualHash)
}

export function shouldRehashCustomerPassword(storedHash = '') {
  return !String(storedHash).startsWith('pbkdf2$')
}

export function createCustomerToken(customer) {
  const ttlHours = Number(process.env.CUSTOMER_SESSION_TTL_HOURS || 24)
  const expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000).toISOString()
  const payload = Buffer.from(
    JSON.stringify({
      sub: customer.id,
      email: customer.email,
      role: 'customer',
      exp: expiresAt,
    }),
  ).toString('base64url')

  return {
    token: `${payload}.${sign(payload)}`,
    expiresAt,
  }
}

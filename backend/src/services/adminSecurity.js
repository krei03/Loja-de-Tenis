import { createHmac, pbkdf2Sync, randomBytes, timingSafeEqual } from 'node:crypto'

const HASH_ITERATIONS = 120000
const HASH_KEY_LENGTH = 64
const HASH_DIGEST = 'sha512'
const fallbackPassword = process.env.ADMIN_PASSWORD || 'vertex123'
const fallbackPasswordHash = createPasswordHash(fallbackPassword)

function getTokenSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_TOKEN || 'vertex-local-admin-secret'
}

function base64Url(input) {
  return Buffer.from(input).toString('base64url')
}

function sign(value) {
  return createHmac('sha256', getTokenSecret()).update(value).digest('base64url')
}

export function createPasswordHash(password) {
  const salt = randomBytes(16).toString('hex')
  const hash = pbkdf2Sync(password, salt, HASH_ITERATIONS, HASH_KEY_LENGTH, HASH_DIGEST).toString('hex')

  return `pbkdf2$${HASH_ITERATIONS}$${salt}$${hash}`
}

export function verifyPassword(password, storedHash = process.env.ADMIN_PASSWORD_HASH || fallbackPasswordHash) {
  const [algorithm, iterations, salt, expectedHash] = String(storedHash).split('$')

  if (algorithm !== 'pbkdf2' || !iterations || !salt || !expectedHash) {
    return false
  }

  const actualHash = pbkdf2Sync(password, salt, Number(iterations), HASH_KEY_LENGTH, HASH_DIGEST)
  const expectedBuffer = Buffer.from(expectedHash, 'hex')

  return expectedBuffer.length === actualHash.length && timingSafeEqual(expectedBuffer, actualHash)
}

export function createAdminToken(admin) {
  const ttlHours = Number(process.env.ADMIN_SESSION_TTL_HOURS || 8)
  const expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000).toISOString()
  const payload = base64Url(
    JSON.stringify({
      sub: admin.username,
      name: admin.name,
      role: 'admin',
      exp: expiresAt,
    }),
  )
  const signature = sign(payload)

  return {
    token: `${payload}.${signature}`,
    expiresAt,
  }
}

export function verifyAdminToken(token) {
  const [payload, signature] = String(token || '').split('.')

  if (!payload || !signature || sign(payload) !== signature) {
    return null
  }

  try {
    const admin = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))

    if (admin.role !== 'admin' || !admin.exp || new Date(admin.exp).getTime() <= Date.now()) {
      return null
    }

    return admin
  } catch {
    return null
  }
}

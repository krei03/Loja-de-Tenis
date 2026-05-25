import { createAdminToken, verifyPassword } from '../services/adminSecurity.js'

export function loginAdmin(req, res) {
  const username = process.env.ADMIN_USER || 'admin'

  if (req.body.username !== username || !verifyPassword(req.body.password || '')) {
    return res.status(401).json({ message: 'Credenciais invalidas.' })
  }

  const session = createAdminToken({
    username,
    name: 'Admin Vertex',
  })

  return res.json({
    token: session.token,
    expiresAt: session.expiresAt,
    user: {
      name: 'Admin Vertex',
      role: 'admin',
    },
  })
}

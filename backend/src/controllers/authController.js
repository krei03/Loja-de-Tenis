export function loginAdmin(req, res) {
  const username = process.env.ADMIN_USER || 'admin'
  const password = process.env.ADMIN_PASSWORD || 'vertex123'
  const token = process.env.ADMIN_TOKEN || 'vertex-admin-token'

  if (req.body.username !== username || req.body.password !== password) {
    return res.status(401).json({ message: 'Credenciais invalidas.' })
  }

  return res.json({
    token,
    user: {
      name: 'Admin Vertex',
      role: 'admin',
    },
  })
}

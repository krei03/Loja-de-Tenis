export function uploadImage(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: 'Imagem nao enviada.' })
  }

  return res.status(201).json({
    url: `/uploads/${req.file.filename}`,
  })
}

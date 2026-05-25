export async function quoteShipping(req, res) {
  const cep = String(req.query.cep || '').replace(/\D/g, '')

  if (cep.length !== 8) {
    return res.status(400).json({ message: 'CEP invalido. Informe 8 numeros.' })
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

    if (!response.ok) {
      throw new Error(`ViaCEP error ${response.status}`)
    }

    const address = await response.json()

    if (address.erro) {
      return res.status(404).json({ message: 'CEP nao encontrado.' })
    }

    const quote = calculateQuote(cep, address.uf)

    return res.json({
      cep,
      address: {
        city: address.localidade,
        district: address.bairro,
        state: address.uf,
        street: address.logradouro,
      },
      ...quote,
    })
  } catch {
    return res.status(502).json({ message: 'Servico de frete indisponivel no momento.' })
  }
}

function calculateQuote(cep, state) {
  const lastDigit = Number(cep.at(-1))
  const southeastStates = new Set(['SP', 'RJ', 'MG', 'ES'])
  const southStates = new Set(['PR', 'SC', 'RS'])
  const baseDays = southeastStates.has(state) ? 2 : southStates.has(state) ? 3 : 5
  const price = southeastStates.has(state) ? 19.9 : southStates.has(state) ? 24.9 : 34.9

  return {
    carrier: 'Vertex Express',
    service: 'Entrega padrao',
    days: baseDays + (lastDigit % 2),
    price: lastDigit % 2 === 0 ? 0 : price,
  }
}

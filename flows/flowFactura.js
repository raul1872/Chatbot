const { addKeyword } = require('@bot-whatsapp/bot')
const flowMenu = require('./flowMenu.js')

const path = require('path')
const fs = require('fs')

const pathfacturaerror = path.join('message', 'facturaerror.txt')
const pathfactura = path.join('message', 'factura.txt')
const pathdelivery = path.join('message', 'delivery.txt')
const pathdeliveryerror = path.join('message', 'deliveryerror.txt')


const facturaerror = fs.readFileSync(pathfacturaerror, 'utf8')
const msjfactura = fs.readFileSync(pathfactura, 'utf8')
const msjdelivery = fs.readFileSync(pathdelivery, 'utf8')
const deliveryerror = fs.readFileSync(pathdeliveryerror, 'utf8')

const facturaSi = addKeyword(['Si'], { useRawText: true })
  .addAnswer(
    msjfactura,
    { capture: true },
    async (ctx, { state, fallBack, gotoFlow }) => {
      const lines = ctx.body
        .split(/\r?\n/)
        .map(l => l.trim())
        .filter(l => l !== '')

      if (lines.length === 5) {
        await state.update({ facturacion: lines })
        return gotoFlow(flowMenu)
      } else {
        return fallBack(facturaerror)
      }
    }
  )

const facturaNo = addKeyword(['No'], { useRawText: true })
  .addAnswer(
    msjdelivery,
    { capture: true },
    async (ctx, { state, fallBack, gotoFlow }) => {
      const lines = ctx.body
        .split(/\r?\n/)
        .map(l => l.trim())
        .filter(l => l !== '')

      if (lines.length === 4) {
        // guardamos datos de dirección
        await state.update({ direccion: lines })
        return gotoFlow(flowMenu)
      } else {
        return fallBack(deliveryerror)
      }
    }
  )

module.exports = {
  facturaSi,
  facturaNo
}
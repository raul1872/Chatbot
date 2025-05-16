const { addKeyword } = require('@bot-whatsapp/bot');
const flowResumen    = require('./flowResumen.js');

const flowPedido = addKeyword(['Realizar pedido'], { useRawText: true })
  .addAnswer(
    '📝 ¿Qué deseas pedir?',
    { capture: true },
    async (ctx, { state, gotoFlow }) => {
      const items = state.get('pedido') || []
      items.push(ctx.body.trim())
      await state.update({ pedido: items })
      return gotoFlow(flowAgregarMas)
    }
  )

  const flowPedidoMas = addKeyword(['Si'], { useRawText: true })
  .addAnswer(
    '📝 Perfecto, ¿qué más deseas?',
    { capture: true },
    async (ctx, { state, gotoFlow }) => {
      const items = state.get('pedido') || []
      items.push(ctx.body.trim())
      await state.update({ pedido: items })
      return gotoFlow(flowAgregarMas)
    }
  )

const flowAgregarMas = addKeyword(
  [/.*/],             
  { regex: true }      
)
.addAnswer(
  '¿Desea agregar algo más?',
  {
    buttons: [
      { body: 'Si' },
      { body: 'Eso es todo' }
    ]
  },
  null,
  [ flowPedidoMas, flowResumen ]
);


module.exports = {
  flowPedido,
  flowPedidoMas,
  flowAgregarMas,
};

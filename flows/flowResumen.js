const { addKeyword } = require('@bot-whatsapp/bot');

const flowResumen = addKeyword(
  ['Eso es todo'],            // patrón exacto
  { useRawText: true }        // match literal del botón
).addAnswer(
  async (_, { state }) => {   // elimino `ctx` porque no lo uso
    console.log('--- resumen trigger ---');

    const fact = state.get('facturacion') || [];
    const dir  = state.get('direccion')   || [];
    const items = state.get('pedido')     || [];

    let resumen = '*📋 Resumen de tu pedido:*\n\n';
    resumen += '*Datos de facturación:*\n';
    fact.forEach(line => resumen += `- ${line}\n`);
    resumen += '\n*Dirección de entrega:*\n';
    dir.forEach(line => resumen += `- ${line}\n`);
    resumen += '\n*Artículos solicitados:*\n';
    items.forEach((it, i) => resumen += `${i+1}. ${it}\n`);

    return resumen;
  }
);

module.exports = flowResumen;

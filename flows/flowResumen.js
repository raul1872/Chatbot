const { addKeyword } = require('@bot-whatsapp/bot')

const flowResumen = addKeyword(['Eso es todo'], { useRawText: true })
  .addAnswer('resumen');  

  module.exports = flowResumen
const { addKeyword } = require('@bot-whatsapp/bot')
const flowFactura = require('./flowFactura.js')

const flowDelivery = addKeyword(['Delivery'])
    .addAnswer('Desea factura?', 
        {
            buttons: [
                { body: 'Si' },
                { body: 'No' }        
            ]
        }, null,
        [flowFactura]
    )

module.exports = flowDelivery;
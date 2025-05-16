const { addKeyword } = require('@bot-whatsapp/bot')
const { facturaSi, facturaNo } = require('./flowFactura.js')

const flowDelivery = addKeyword(['Delivery'])
    .addAnswer('Desea factura?', 
        {
            buttons: [
                { body: 'Si' },
                { body: 'No' }        
            ]
        }, null,
    [ facturaSi, facturaNo ]
    )

module.exports = flowDelivery;
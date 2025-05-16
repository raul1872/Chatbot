const { addKeyword } = require('@bot-whatsapp/bot');
const flowDelivery = require('./flowDelivery');

const flowPedir = addKeyword(['Hacer un pedido'])
    .addAnswer('Favor indicar el tipo de pedido.', 
        {
            capture: true,
            buttons: [
                { body: 'En el local' },
                { body: 'Delivery' }        
            ]
        }, null, 
        [flowDelivery]
    )

module.exports = flowPedir;

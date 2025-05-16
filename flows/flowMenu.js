const { addKeyword } = require('@bot-whatsapp/bot')
const { flowPedido } = require('./flowPedido.js');

const flowMenu = addKeyword(['Ver el menu'], { useRawText: true })
    .addAnswer('Aquí puedes ver el menú: \n\nhttps://drive.google.com/file/d/1TL9yN1-4nN1B5L83IyUJVvMraQph_Jf2/view?usp=drive_link',
        {
            buttons: [
                { body: 'Realizar pedido' },
                { body: 'Hablar con un asesor' }        
            ]
        }, null,
        [flowPedido]
    )

  module.exports = flowMenu
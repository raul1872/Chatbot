const { addKeyword } = require('@bot-whatsapp/bot')
const flowPedir = require('./flowPedir.js')

const flowPrincipal = addKeyword(['hola', 'ola', 'Buenas'])
    .addAnswer('Buenas! Como estás?')
    .addAnswer(
        'Que deseas hacer?',
        {
            capture: true,
            buttons: [
                { body: 'Hacer un pedido' },
                { body: 'Ver el menu' },
                { body: 'Hablar con un asesor' }
            ]
        }, null,
        [flowPedir]	
    )

module.exports = flowPrincipal
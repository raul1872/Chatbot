const dotenv = require('dotenv');
dotenv.config()

const { createBot, createProvider, createFlow} = require('@bot-whatsapp/bot')

const MetaProvider = require('@bot-whatsapp/provider/meta')
const MongoAdapter = require('@bot-whatsapp/database/mongo')

const flowPrincipal = require('./flows/flowPrincipal.js');
const flowDelivery = require('./flows/flowDelivery.js');
const flowMenu = require('./flows/flowMenu.js');
const {flowPedido, flowAgregarMas} = require('./flows/flowPedido');

const main = async () => {
    const adapterDB = new MongoAdapter({ 
        dbUri: process.env.MONGO_DB_URI,
        dbName: process.env.MONGO_DB_NAME,
    });    
 
    const adapterFlow = createFlow([flowPrincipal, flowPedido, flowAgregarMas])

    const adapterProvider = createProvider(MetaProvider, {
        jwtToken: process.env.jwtToken,
        numberId: process.env.numberId,
        verifyToken: process.env.verifyToken,
        version: process.env.version,
    })

    adapterProvider.on('message', msg => {
        console.log('🔔 [GLOBAL] llegó mensaje:', msg.body)
      })     

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
        flowMap: [ flowDelivery, flowMenu ]
    })
}

main()

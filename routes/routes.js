const {getItemsHandler, getItemHandler, addItemController} = require('../controllers/controllers')

//Schema for single item, simply an object

const itemSchema = {
    type:'object',
    properties:{
        id:{type: 'integer'},
        name:{type:'string'},
    }
}

//Options for get all items
const getItemsOptions = {
    schema:{
        response:{
            200: {
                type:'array',
                items:itemSchema,
            }
        },
    },
    handler: getItemsHandler,
}

//Options for getting single item
const getItemOptions = {
    schema:{
        response:{
            200:itemSchema,
        },
    },
    handler: getItemHandler,
}

//Options for adding single item
const postItemOptions = {
    schema:{
        response:{
            201: itemSchema,
        },
    },
    handler: addItemController,
}

function routes (fastify,options,done){

    //default
    fastify.get('/',(req,reply)=>{
        reply.send({test:'Hello'});
    })

    //test
    fastify.get('/test',(req,reply)=>{
        reply.send({test:'Hello world'});
    })
    
    //get all items
    fastify.get('/items',getItemsOptions);
    
    //get single item
    fastify.get('/item/:id',getItemOptions);

    //add item
    fastify.post('/items',postItemOptions);

    done();
}

module.exports = routes;
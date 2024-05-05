const items = require('../items');
const {v4:uuidv4} = require('uuid');

const getItemsHandler = (req,reply)=> {
    reply.send(items);
}

const getItemHandler = (req,reply)=>{
    const {id} = req.params;    //destructuring object

    const item = items.find((item)=> item.id === id);

    reply.send(item);
}

const addItemController = (req,reply)=>{
    const {name} = req.body;
    console.log("name is"+name)

    const item = {
        id: uuidv4(),
        name: name,
    };

    //items = [...items,item];

    //send back the item to the client
    reply.code(201).send(item);
}

module.exports = {getItemsHandler,getItemHandler,addItemController}
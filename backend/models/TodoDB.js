const mongoose = require('mongoose');


const TodoSchema = mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    status:{
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Todoschema', TodoSchema);
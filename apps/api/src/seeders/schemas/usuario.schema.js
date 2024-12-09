const mongoose = require("mongoose");
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: false
    },
    role:{
        name:{
            type: String,
            required: true
        },
        level:{
            type: Number,
            required: true
        }
    },
    resetPassToken:{
        type: String,
        required: false,
        default: null
    }
});

const Usuario = mongoose.model('usuarios', UsuarioSchema);
module.exports = Usuario;

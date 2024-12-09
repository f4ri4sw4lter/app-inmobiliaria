const mongoose = require("mongoose");
const { Schema } = mongoose;

const PropiedadSchema = new Schema({
    propietario: {
        type: mongoose.Schema.Types.ObjectId, // Referencia a un cliente
        ref: 'Client', // La colección a la que se refiere
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
	descripcion: {
        type: String,
        required: false
    },
    tipo: {
        type: String,
        required: true
    },
    cant_amb: {
        type: Number,
        required: true
    },
    cant_ba: {
        type: Number,
        required: true
    },
    cant_hab: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: false
    },
    precioUSD: {
        type: Number,
        required: false
    },
    ubicacion:{
        provincia: {
            type: String,
            required: true
        },
        municipio: {
            type: String,
            required: true
        },
        calle: {
            type: String,
            required: true
        },
        altura: {
            type: Number,
            required: true
        },
        mapa: {
            type: String,
            required: false
        }
    },
    equipamientos:{
        type: [String],
        required: false
    },
	estado: {
        type: String,
        required: true
    },
    cliente: {
        type: Number,
        required: false
    },
	contrato: {
        type: String,
        required: false
    },
    createdAt: {
        type:Date,
        default: Date.now
    },
    activo: {
        type:Boolean,
        default: false
    },
	destacado: {
        type:Boolean,
        default: false
    }
});

const Propiedad = mongoose.model('propiedads', PropiedadSchema);
module.exports = Propiedad;

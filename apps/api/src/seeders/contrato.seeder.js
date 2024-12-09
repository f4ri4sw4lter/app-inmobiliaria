const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Client = require("./schemas/client.schema");
const Propiedad = require("./schemas/propiedad.schema");
const Contrato = require("./schemas/contrato.schema");
const Usuario = require("./schemas/usuario.schema");
require('dotenv').config();

mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

const seedContrato = async () => {
    try {

        const clientes = await Client.find();
        const inmuebles = await Propiedad.find();
        const empleados = await Usuario.find({"role.level": 3});

        const contratos = Array.from({ length: 50 }).map(() => ({
            inmueble: inmuebles[Math.floor(Math.random() * inmuebles.length)],
            propietario: clientes[Math.floor(Math.random() * clientes.length)],
            cliente: clientes[Math.floor(Math.random() * clientes.length)],
            empleado: empleados[Math.floor(Math.random() * empleados.length)].name,
            fecha: faker.date.past(),
            detalle: faker.lorem.paragraph(),
            createdAt: faker.date.past(),
        }));

        // Inserta los datos
        await Contrato.insertMany(contratos);
        console.log('Datos insertados correctamente');
    } catch (err) {
        console.error('Error al insertar datos:', err);
    } finally {
        mongoose.connection.close();
    }
};

// Ejecuta el seed
seedContrato();

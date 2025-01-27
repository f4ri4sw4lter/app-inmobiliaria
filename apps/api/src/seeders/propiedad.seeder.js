const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Client = require("./schemas/client.schema");
const Propiedad = require("./schemas/propiedad.schema");
require('dotenv').config();

mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

const seedPropiedades = async () => {
    try {
        const clientes = await Client.find();  // Devuelve todos los clientes

        // Genera 100 usuarios falsos
        const propiedades = Array.from({ length: 50 }).map(() => ({
            propietario: clientes[Math.floor(Math.random() * clientes.length)]._id,
            titulo: faker.lorem.sentence(),  // Título de la propiedad
            descripcion: faker.lorem.paragraph(),  // Descripción opcional
            tipo: faker.helpers.arrayElement(['Casa', 'Departamento', 'Cochera', 'Comerciales', 'Terreno o Lote', 'Campo']),  // Tipo de propiedad
            cant_amb: faker.number.int({ min: 1, max: 10 }),  // Cantidad de ambientes
            cant_ba: faker.number.int({ min: 1, max: 5 }),  // Cantidad de baños
            cant_hab: faker.number.int({ min: 1, max: 5 }),  // Cantidad de habitaciones
            precio: faker.number.int({ min: 1000000, max: 5000000 }),  // Precio en moneda local
            precioUSD: faker.number.int({ min: 100000, max: 200000 }),  // Precio en USD (opcional)
            ubicacion: {
                provincia: faker.location.state(),  // Provincia
                municipio: faker.location.city(),  // Municipio
                calle: faker.location.street(),  // Calle
                altura: faker.number.int({ min: 1, max: 2000 }),  // Altura
                mapa: faker.internet.url(),  // URL del mapa (opcional)
            },
            estado: faker.helpers.arrayElement(['Disponible', 'Vendido', 'Alquilado']),  // Estado de la propiedad
            cliente: faker.number.int({ min: 1, max: 50 }),  // Relacionado a un cliente (opcional)
            contrato: faker.helpers.arrayElement(['Alquiler', 'Venta']),  // Tipo de contrato
            createdAt: faker.date.past(),  // Fecha de creación
            activo: faker.datatype.boolean(),  // Activo o no
            destacado: faker.datatype.boolean(),  // Propiedad destacada o no
            mascotas: faker.datatype.boolean(),  // Permite mascotas o no
            cochera: faker.datatype.boolean(),  // Propiedad con cochera o no
            infantes: faker.datatype.boolean(),  // Permite infantes o no
            superficie: faker.number.int({ min: 10, max: 100 }),  // Superficie en metros cuadrados
        }));
        

        // Inserta los datos
        await Propiedad.insertMany(propiedades);
        console.log('Datos insertados correctamente');
    } catch (err) {
        console.error('Error al insertar datos:', err);
    } finally {
        mongoose.connection.close();
    }
};

// Ejecuta el seed
seedPropiedades();

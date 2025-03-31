const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Client = require("./schemas/client.schema");
require('dotenv').config();

mongoose
  .connect('mongodb://localhost:27017/?retryWrites=true&loadBalanced=false&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000000', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

const seedClient = async () => {
    try {

        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() - 18);
        
        // Fecha máxima (opcional: puedes establecer un rango máximo, ej. 100 años)
        const minDate = new Date(maxDate);
        minDate.setFullYear(minDate.getFullYear() - 82); // 100 años total (18+82)
        
        // Genera 50 usuarios falsos
        const clients = Array.from({ length: 10000 }).map(() => ({
            dni: faker.number.int({ min: 11111111, max: 99999999 }),
            nombre: faker.person.firstName(),
            apellido: faker.person.lastName(),
            correo: faker.internet.email(),
            celular: faker.string.numeric('+54 9 ## #### ####'),
            telefono: faker.string.numeric('+54 ## #### ####'),
            genero: faker.helpers.arrayElement(['Masculino', 'Femenino', 'Otro']),
            fechaNacimiento: faker.date.between({ 
                from: minDate, 
                to: maxDate 
            }),
            ubicacion: {
                provincia: faker.number.int({ min: 1, max: 30 }),
                municipio: faker.number.int({ min: 1, max: 30 }),
                calle: faker.location.streetAddress(),
                altura: faker.number.int({ min: 1, max: 2000 }),
            },
            createdAt: faker.date.past(),
        }));

        // Inserta los datos
        await Client.insertMany(clients);
        console.log('Datos insertados correctamente');
    } catch (err) {
        console.error('Error al insertar datos:', err);
    } finally {
        mongoose.connection.close();
    }
};

// Ejecuta el seed
seedClient();

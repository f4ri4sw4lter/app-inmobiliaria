import axios from 'axios';

export const createInmueble = async( data ) => {

    const apiUrl = '/api/propiedad/create';

    const newInmueble = {
        "propietario": data.propietario,
        "titulo": data.titulo,
        "descripcion": data.descripcion,
        "tipo": data.tipo,
        "cant_amb": data.cant_amb,
        "cant_ba": data.cant_ba,
        "cant_hab": data.cant_hab,
        "precio": data.precio,
        "imagenes": null,
        "ubicacion":{
            "provincia": data.provincia,
            "ciudad": data.ciudad,
            "calle": data.calle,
            "altura": data.altura
        },
        "equipamientos": "",
        "estado": data.estado,
        "cliente": 0,
        "contrato": data.contrato
    }

    const requestConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newInmueble)
    };

    console.log(requestConfig);

    fetch(apiUrl, requestConfig)
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });
}
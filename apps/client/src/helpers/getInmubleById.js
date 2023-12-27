export const getInmuebleById = async({id}) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDk2MTE2NGU1ZDk5OTZhMzJlN2ExODMiLCJpYXQiOjE2OTAyNDUyMzQsImV4cCI6MTY5MTEwOTIzNH0.4KM3p9k-lE5GW5ZpPXaoLpTwFliuqfb7W5yXkymTtHM'
        },
    };

    try {
        const response = await fetch(`/api/propiedad/${id}`, options);

        if (response.ok) {
            const data = await response.json();
            return data; // Muestra los datos por consola
        } else {
            console.error('Error al obtener los datos de la API');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}
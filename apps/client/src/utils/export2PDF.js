import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportToPDF = (filename, data, columns) => {
    const doc = new jsPDF();
    
    // Generar las filas dinámicamente basándote en las claves
    const rows = data.map(item => columns.map(column => item[column.value] ?? ''));
    
    // Obtener solo los labels para las cabeceras
    const headers = columns.map(column => column.label);
    
    // Configuración de estilos para los bordes
    const tableStyles = {
        headStyles: {
            fillColor: [68, 114, 196], // Azul similar al Excel
            textColor: 255, // Texto blanco
            fontStyle: 'bold',
            lineWidth: 0.1, // Ancho del borde
            lineColor: [0, 0, 0] // Color negro para bordes
        },
        bodyStyles: {
            lineWidth: 0.1, // Ancho del borde
            lineColor: [0, 0, 0] // Color negro para bordes
        },
        alternateRowStyles: {
            fillColor: [240, 240, 240] // Color para filas alternas (opcional)
        },
        styles: {
            cellPadding: 4, // Espaciado interno de celdas
            fontSize: 10, // Tamaño de fuente
            valign: 'middle', // Alineación vertical
            halign: 'left', // Alineación horizontal
            lineColor: [0, 0, 0] // Color negro para todos los bordes
        },
        margin: { top: 10 }, // Margen superior
        tableLineColor: [0, 0, 0], // Color de líneas de la tabla (negro)
        tableLineWidth: 0.1 // Ancho de línea de la tabla
    };

    // Agregar la tabla al PDF con los estilos configurados
    doc.autoTable({
        head: [headers],
        body: rows,
        ...tableStyles // Aplicar todos los estilos configurados
    });

    // Descargar el PDF
    doc.save(filename + '.pdf');
};

export default exportToPDF;
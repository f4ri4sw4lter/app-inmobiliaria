import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportToPDF = (filename, data, columns) => {
    const doc = new jsPDF();
    // Generar las filas dinámicamente basándote en las claves
    const rows = data.map(item => columns.map(column => item[column.value]));

    columns = columns.map(column => column.label);

    // Agregar la tabla al PDF
    doc.autoTable({
        head: [columns],
        body: rows,
    });

    // Descargar el PDF
    doc.save(filename + '.pdf');
};

export default exportToPDF;

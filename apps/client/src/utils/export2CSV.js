import { Parser } from '@json2csv/plainjs';

export const exportToCSV = (filename, data, fields) => {

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(data);

    // Crear un enlace para descargar el CSV
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', filename + '.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export default exportToCSV; 
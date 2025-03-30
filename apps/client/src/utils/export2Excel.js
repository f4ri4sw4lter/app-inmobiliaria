import ExcelJS from 'exceljs';

export const exportToExcel = async (filename, data, fields) => {
    if (!Array.isArray(data) || data.length === 0) {
        console.error("Los datos para exportar están vacíos o no son un array.");
        return;
    }

    if (!Array.isArray(fields) || fields.length === 0) {
        console.error("Los campos especificados no son un array válido.");
        return;
    }

    try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Datos');

        // Definir estilos comunes
        const commonBorder = {
            top: { style: 'thin', color: { argb: 'FF000000' } },
            left: { style: 'thin', color: { argb: 'FF000000' } },
            bottom: { style: 'thin', color: { argb: 'FF000000' } },
            right: { style: 'thin', color: { argb: 'FF000000' } }
        };

        const headerStyle = {
            font: { bold: true, color: { argb: 'FFFFFFFF' }, size: 12 },
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } },
            alignment: { vertical: 'middle', horizontal: 'center' },
            border: commonBorder
        };

        const cellStyle = {
            alignment: { vertical: 'middle', horizontal: 'left' },
            border: commonBorder
        };

        // Añadir cabeceras
        const headers = fields.map(field => field.label);
        const headerRow = worksheet.addRow(headers);
        headerRow.eachCell(cell => { cell.style = headerStyle; });

        // Añadir datos
        data.forEach(rowData => {
            const rowValues = fields.map(field => rowData[field.value] ?? '');
            const row = worksheet.addRow(rowValues);
            row.eachCell(cell => { cell.style = cellStyle; });
        });

        // Función para calcular el ancho máximo de cada columna
        const calculateColumnWidths = () => {
            const columnWidths = fields.map(() => 10); // Ancho mínimo inicial

            // Calcular ancho para cabeceras
            worksheet.getRow(1).eachCell((cell, colNumber) => {
                const headerLength = cell.value ? cell.value.toString().length : 0;
                if (headerLength > columnWidths[colNumber - 1]) {
                    columnWidths[colNumber - 1] = headerLength;
                }
            });

            // Calcular ancho para datos
            worksheet.eachRow((row, rowNumber) => {
                if (rowNumber === 1) return; // Saltar cabecera
                
                row.eachCell((cell, colNumber) => {
                    const cellValue = cell.value ? cell.value.toString().length : 0;
                    if (cellValue > columnWidths[colNumber - 1]) {
                        columnWidths[colNumber - 1] = cellValue;
                    }
                });
            });

            // Aplicar un factor de ajuste (1.2 para dar un poco de margen)
            return columnWidths.map(width => ({ 
                width: Math.min(width * 1.2 + 2, 50), // Máximo 50 caracteres
                style: { alignment: { wrapText: true } }
            }));
        };

        // Aplicar anchos de columna calculados
        worksheet.columns = calculateColumnWidths();

        // Congelar cabeceras
        worksheet.views = [{ state: 'frozen', ySplit: 1 }];

        // Generar y descargar archivo
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { 
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.xlsx`;
        a.click();
        
        setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (error) {
        console.error("Error al exportar a Excel:", error);
    }
};

export default exportToExcel;
import Button from '@mui/material/Button';
import exportToCSV from '../../utils/export2CSV';
import exportToPDF from '../../utils/export2PDF';

const BotoneraExport = ({filename, dataCSV, dataPDF, fields, columns}) => {


    const handleExportCSV = () => {
        exportToCSV(filename, dataCSV, fields)
    }

    const handleExportPDF = () => {
        exportToPDF(filename, dataPDF, columns)
    }

    return (
        <>
            <Button onClick={handleExportCSV}
                startIcon={<img src={'../../../../public/assets/icons/flaticon/csv.png'} 
                alt="icon" 
                style={{ width: 44, height: 44 }} />}>
                    Descargar CSV
            </Button>

            <Button onClick={handleExportPDF}
                startIcon={<img src={'../../../../public/assets/icons/flaticon/pdf.png'} 
                alt="icon" 
                style={{ width: 44, height: 44 }} />}>
                    Descargar PDF
            </Button>
        </>
    )
}

export default BotoneraExport
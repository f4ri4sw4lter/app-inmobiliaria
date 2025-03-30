import Button from '@mui/material/Button';
import exportToExcel from '../../utils/export2Excel';
import exportToPDF from '../../utils/export2PDF';

const BotoneraExport = ({filename, dataExcel, dataPDF, fields, columns}) => {

    const handleExportExcel = () => {
        exportToExcel(filename, dataExcel, fields)
    }

    const handleExportPDF = () => {
        exportToPDF(filename, dataPDF, columns)
    }

    return (
        <>
            <Button 
                onClick={handleExportExcel}
                sx={{
                    border: '1px solid #ccc',
                    borderRadius: 3,
                    mr: 2,
                    '&:hover': {
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        borderColor: "blue",
                    },
                }}
                startIcon={
                    <img src={'../../../../public/assets/icons/flaticon/csv.png'} 
                    alt="icon" 
                    style={{ width: 44, height: 44}} />
                }>
                    Descargar xlsx
            </Button>

            <Button 
                onClick={handleExportPDF}
                sx={{
                    border: '1px solid #ccc',
                    borderRadius: 3,
                    mr: 2,
                    '&:hover': {
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        borderColor: "blue",
                    },
                }}
                startIcon={<img src={'../../../../public/assets/icons/flaticon/pdf.png'} 
                alt="icon" 
                style={{ width: 44, height: 44 }} />}>
                    Descargar PDF
            </Button>
        </>
    )
}

export default BotoneraExport

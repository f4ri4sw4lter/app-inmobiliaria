import { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Iconify from '../../components/iconify';
import Typography from '@mui/material/Typography';


// ----------------------------------------------------------------------

export default function ClienteTableRowFilter({ numSelected, filterName, onFilterName, filterLastName, onFilterLastName, filterDni, onFilterDni, filterMail, onFilterMail }) {

    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox" selected={numSelected} >

                <TableCell component="th" sx={{ border: '1px solid #ccc' }}>
                    <OutlinedInput
                        value={filterDni}
                        onChange={onFilterDni}
                        placeholder="Buscar DNI..."
                        startAdornment={
                            <InputAdornment position="start">
                                <Iconify
                                    icon="eva:search-fill"
                                    sx={{ color: 'text.disabled', width: 20, height: 20 }}
                                />
                            </InputAdornment>
                        }
                        sx={{ width: '100%' }}
                    />
                </TableCell>

                <TableCell sx={{ border: '1px solid #ccc' }}>
                    <OutlinedInput
                        value={filterLastName}
                        onChange={onFilterLastName}
                        placeholder="Buscar apellido..."
                        startAdornment={
                            <InputAdornment position="start">
                                <Iconify
                                    icon="eva:search-fill"
                                    sx={{ color: 'text.disabled', width: 20, height: 20 }}
                                />
                            </InputAdornment>
                        }
                        sx={{ width: '100%' }}
                    />
                </TableCell>

                <TableCell sx={{
                    minWidth: '90px',
                    textAlign: 'left',
                    border: '1px solid #ccc'
                }}>
                    <OutlinedInput
                        value={filterName}
                        onChange={onFilterName}
                        placeholder="Buscar nombre..."
                        startAdornment={
                            <InputAdornment position="start">
                                <Iconify
                                    icon="eva:search-fill"
                                    sx={{ color: 'text.disabled', width: 20, height: 20 }}
                                />
                            </InputAdornment>
                        }
                        sx={{ width: '100%' }}
                    />

                </TableCell>


                <TableCell sx={{
                    minWidth: '100px',
                    textAlign: 'center',
                    border: '1px solid #ccc'
                }}>
                    <OutlinedInput
                        value={filterMail}
                        onChange={onFilterMail}
                        placeholder="Buscar correo..."
                        startAdornment={
                            <InputAdornment position="start">
                                <Iconify
                                    icon="eva:search-fill"
                                    sx={{ color: 'text.disabled', width: 20, height: 20 }}
                                />
                            </InputAdornment>
                        }
                        sx={{ width: '100%' }}
                    />
                </TableCell>

                <TableCell sx={{
                    minWidth: '100px',
                    textAlign: 'center',
                    border: '1px solid #ccc'
                }}>
                </TableCell>

                <TableCell sx={{
                    minWidth: '100px',
                    textAlign: 'center',
                    border: '1px solid #ccc'
                }}>
                </TableCell>

                <TableCell sx={{
                    minWidth: '100px',
                    textAlign: 'center',
                    border: '1px solid #ccc'
                }}>
                </TableCell>

            </TableRow>

        </>
    );
}

ClienteTableRowFilter.propTypes = {

};

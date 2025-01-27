import { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TableCell from '@mui/material/TableCell';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Iconify from '../../components/iconify';
import Typography from '@mui/material/Typography';


// ----------------------------------------------------------------------

export default function ContratoTableRowFilter({ numSelected, filterName, onFilterName }) {

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={numSelected} >

        <TableCell component="th" sx={{ border: '1px solid #ccc' }}>
          <OutlinedInput
            value={filterName}
            onChange={onFilterName}
            placeholder="Buscar contrato..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
              </InputAdornment>
            }
          />
        </TableCell>

        <TableCell>
          
        </TableCell>

        <TableCell sx={{
          minWidth: '90px',
          textAlign: 'left',
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

ContratoTableRowFilter.propTypes = {

};

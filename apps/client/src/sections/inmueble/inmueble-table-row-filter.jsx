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

export default function InmuebleTableRowFilter({ numSelected, filterName, onFilterName, data, filterTipo, filterContrato, filterEstado, filterInfantes, filterMascotas, filterCochera, setFilterTipo, setFilterContrato, setFilterEstado, setFilterInfantes, setFilterMascotas, setFilterCochera }) {

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={numSelected}
      >

        <TableCell component="th" sx={{ border: '1px solid #ccc' }}>
          <OutlinedInput
            value={filterName}
            onChange={onFilterName}
            placeholder="Buscar Inmueble..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
              </InputAdornment>
            }
            sx={{width: '100%'}}
          />
        </TableCell>

        <TableCell>
          <Select
            value={filterTipo}
            onChange={(e) => setFilterTipo(e.target.value)}
            displayEmpty
            sx={{ minWidth: 120, marginRight: 2 }}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="Casa">Casa</MenuItem>
            <MenuItem value="Departamento">Departamento</MenuItem>
            <MenuItem value="Cochera">Cochera</MenuItem>
            <MenuItem value="Comerciales">Comerciales</MenuItem>
            <MenuItem value="Terreno o Lote">Terreno o Lote</MenuItem>
            <MenuItem value="Campo">Campo</MenuItem>
          </Select>
        </TableCell>

        <TableCell sx={{
          minWidth: '90px',
          textAlign: 'left',
          border: '1px solid #ccc'
        }}>
          <Select
            value={filterContrato}
            onChange={(e) => setFilterContrato(e.target.value)}
            displayEmpty
            sx={{ minWidth: 120, marginRight: 2 }}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="Venta">Venta</MenuItem>
            <MenuItem value="Alquiler">Alquiler</MenuItem>
          </Select>
        </TableCell>

        <TableCell sx={{
          minWidth: '90px',
          textAlign: 'left',
          color: 'green',
          border: '1px solid #ccc'
        }}>
          <Select
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
            displayEmpty
            sx={{ minWidth: 120, marginRight: 2 }}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="Disponible">Disponible</MenuItem>
            <MenuItem value="Alquilado">Alquilado</MenuItem>
            <MenuItem value="Vendido">Vendido</MenuItem>
          </Select>

        </TableCell>


        <TableCell sx={{
          minWidth: '100px',
          textAlign: 'center',
          border: '1px solid #ccc'
        }}>
          <Select
            value={filterInfantes}
            onChange={(e) => setFilterInfantes(e.target.value)}
            displayEmpty
            sx={{ minWidth: 120, marginRight: 2 }}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="1">SI</MenuItem>
            <MenuItem value="0">NO</MenuItem>
          </Select>
        </TableCell>

        <TableCell sx={{
          minWidth: '100px',
          textAlign: 'center',
          border: '1px solid #ccc'
        }}>
          <Select
            value={filterMascotas}
            onChange={(e) => setFilterMascotas(e.target.value)}
            displayEmpty
            sx={{ minWidth: 120, marginRight: 2 }}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="1">SI</MenuItem>
            <MenuItem value="0">NO</MenuItem>
          </Select>
        </TableCell>

        <TableCell sx={{
          minWidth: '100px',
          textAlign: 'center',
          border: '1px solid #ccc'
        }}>
          <Select
            value={filterCochera}
            onChange={(e) => setFilterCochera(e.target.value)}
            displayEmpty
            sx={{ minWidth: 120, marginRight: 2 }}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="1">SI</MenuItem>
            <MenuItem value="0">NO</MenuItem>
          </Select>
        </TableCell>

        <TableCell sx={{
          minWidth: '100px',
          textAlign: 'center',
          border: '1px solid #ccc'
        }}></TableCell>

        <TableCell sx={{
          minWidth: '100px',
          textAlign: 'center',
          border: '1px solid #ccc'
        }}></TableCell>

        <TableCell sx={{
          minWidth: '100px',
          textAlign: 'center',
          border: '1px solid #ccc'
        }}></TableCell>

        <TableCell align="right" sx={{ border: '1px solid #ccc' }}>
        </TableCell>
      </TableRow>

    </>
  );
}

InmuebleTableRowFilter.propTypes = {

};

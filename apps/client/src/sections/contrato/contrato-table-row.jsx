import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { NavLink } from 'react-router-dom';

import Iconify from '../../components/iconify';


// ----------------------------------------------------------------------

export default function ContratoTableRow({
  selected,
  id,
  inmueble,
  propietario,
  cliente,
  empleado,
  fecha,
  handleClick,
}) {
  const [open, setOpen] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const nuevaFecha = new Date(fecha);

  const opcionesFecha = { 
    year: 'numeric', 
    month: 'numeric', 
    day: 'numeric'
  };

  const fechaFormateada = nuevaFecha.toLocaleDateString('es-ES', opcionesFecha)

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    handleCloseMenu();
  };

  const handleConfirmDialog = () => {
    deleteClienteById(id);
    setOpenDialog(false);
    setOpen(null);
    window.location.reload();
  };


  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };


  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>

        <TableCell sx={{ border: '1px solid #ccc' }}><NavLink to={`/backoffice/inmuebles/ver/${inmueble}`}>{inmueble}</NavLink></TableCell>

        <TableCell sx={{ border: '1px solid #ccc' }}><NavLink to={`/backoffice/clientes/ver/${propietario}`}>{propietario}</NavLink></TableCell>

        <TableCell sx={{ border: '1px solid #ccc' }}><NavLink to={`/backoffice/clientes/ver/${cliente}`}>{cliente}</NavLink></TableCell>

        <TableCell sx={{ border: '1px solid #ccc' }}>{empleado}</TableCell>

        <TableCell sx={{ border: '1px solid #ccc' }}>{fechaFormateada}</TableCell>

        <TableCell align="right" sx={{ border: '1px solid #ccc' }}>
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140, border: '1px solid #ccc' },
        }}
      >
        
        <NavLink to={`/backoffice/clientes/ver/${id}`} className='nav-item nav-link' key="ver">
          <MenuItem sx={{ border: '1px solid #ccc' }}>
            <Button>
              <Iconify icon="eva:eye-fill" sx={{ mr: 2 }} />
              Ver
            </Button>
          </MenuItem>
        </NavLink>

        <NavLink to={`/backoffice/clientes/editar/${id}`} className='nav-item nav-link' key="editar">
          <MenuItem sx={{ border: '1px solid #ccc' }}>
            <Button>
              <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
              Editar
            </Button>
          </MenuItem >
        </NavLink>

        <MenuItem sx={{ color: 'error.main', border: '1px solid #ccc' }}>
          <Button onClick={handleClickOpenDialog}>
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            Borrar
          </Button>
        </MenuItem>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Confirmación</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Estás seguro de que deseas borrar este cliente?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleConfirmDialog} color="primary">
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </Popover>
    </>
  );
}

ContratoTableRow.propTypes = {
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  inmueble: PropTypes.any,
  propietario: PropTypes.any,
  empleado: PropTypes.any,
  fecha: PropTypes.any
};

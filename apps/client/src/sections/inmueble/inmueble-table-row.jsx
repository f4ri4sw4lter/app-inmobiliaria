import { useState } from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { NavLink } from 'react-router-dom';
import Label from '../../components/label';
import Iconify from '../../components/iconify';

import { deleteInmuebleById } from '../../helpers/deleteInmuebleById';

// ----------------------------------------------------------------------

export default function InmuebleTableRow({
  selected,
  id,
  titulo,
  contrato,
  estado,
  ambientes,
  habitaciones,
  banios,
  handleClick,
}) {
  const [open, setOpen] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    handleCloseMenu();
  };

  const handleConfirmDialog = () => {
    deleteInmuebleById(id);
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
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected} >

        <TableCell component="th" sx={{ border: '1px solid #ccc' }}>
          <Typography variant="subtitle2" noWrap>
            {titulo}
          </Typography>
        </TableCell>

        <TableCell sx={{
          minWidth: '90px',
          textAlign: 'left',
          border: '1px solid #ccc'
        }}>{contrato}</TableCell>

        {estado == 'Alquilado' || estado == 'Vendido'
          ? (
            <TableCell sx={{
              minWidth: '90px',
              textAlign: 'left',
              color: 'red',
              border: '1px solid #ccc'
            }}>{estado}</TableCell>
          ) : (
            <TableCell sx={{
              minWidth: '90px',
              textAlign: 'left',
              color: 'green',
              border: '1px solid #ccc'
            }}>{estado}</TableCell>
          )}

        <TableCell sx={{
          minWidth: '100px',
          textAlign: 'center',
          border: '1px solid #ccc'
        }}>{ambientes}</TableCell>

        <TableCell sx={{
          minWidth: '100px',
          textAlign: 'center',
          border: '1px solid #ccc'
        }}>{habitaciones}</TableCell>

        <TableCell sx={{
          minWidth: '100px',
          textAlign: 'center',
          border: '1px solid #ccc'
        }}>{banios}</TableCell>

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
        <NavLink to={`/backoffice/inmuebles/ver/${id}`} className='nav-item nav-link' key="ver">
          <MenuItem>
            <Button>
              <Iconify icon="eva:eye-fill" sx={{ mr: 2 }} />
              Ver
            </Button>
          </MenuItem>
        </NavLink>

        <NavLink to={`/backoffice/inmuebles/editar/${id}`} className='nav-item nav-link' key="editar">
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
              ¿Estás seguro de que deseas borrar este inmueble?
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

InmuebleTableRow.propTypes = {
  titulo: PropTypes.string,
  descripcion: PropTypes.string,
  contrato: PropTypes.string,
  estado: PropTypes.string,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  ambientes: PropTypes.number
};

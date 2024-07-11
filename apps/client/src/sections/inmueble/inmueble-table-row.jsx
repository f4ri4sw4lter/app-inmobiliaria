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
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {titulo}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell sx={{
          minWidth: '90px',
          textAlign: 'left'
        }}>{contrato}</TableCell>

        {estado == 'Alquilado' || estado == 'Vendido'
          ? (
            <TableCell sx={{
              minWidth: '90px',
              textAlign: 'left',
              color: 'red'
            }}>{estado}</TableCell>
          ) : (
            <TableCell sx={{
              minWidth: '90px',
              textAlign: 'left',
              color: 'green'
            }}>{estado}</TableCell>
          )}

        <TableCell sx={{
          minWidth: '100px',
          textAlign: 'center'
        }}>{ambientes}</TableCell>

        <TableCell sx={{
          minWidth: '100px',
          textAlign: 'center'
        }}>{habitaciones}</TableCell>

        <TableCell sx={{
          minWidth: '100px',
          textAlign: 'center'
        }}>{banios}</TableCell>

        <TableCell align="right">
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
          sx: { width: 140 },
        }}
      >
        <MenuItem>
          <NavLink to={`/backoffice/inmuebles/ver/${id}`} className='nav-item nav-link' key="ver">
            <Iconify icon="eva:eye-fill" sx={{ mr: 2 }} />
            Ver
          </NavLink>
        </MenuItem>

        <MenuItem>
          <NavLink to={`/backoffice/inmuebles/editar/${id}`} className='nav-item nav-link' key="editar">
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Editar
          </NavLink>
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          <Button onClick={handleClickOpenDialog}>
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

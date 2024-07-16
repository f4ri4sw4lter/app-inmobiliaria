import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Iconify from '../../components/iconify';

import { deleteClienteById } from '../../helpers/deleteClienteById';

// ----------------------------------------------------------------------

export default function ClienteTableRow({
  selected,
  id,
  dni,
  apellido,
  name,
  correo,
  telefono,
  celular,
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
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>{dni}</TableCell>

        <TableCell>{apellido}</TableCell>

        <TableCell>{name}</TableCell>

        <TableCell>{correo}</TableCell>

        <TableCell>{telefono}</TableCell>

        <TableCell>{celular}</TableCell>

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

ClienteTableRow.propTypes = {
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  dni: PropTypes.any,
  apellido: PropTypes.any,
  correo: PropTypes.any,
  telefono: PropTypes.any,
  celular: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};

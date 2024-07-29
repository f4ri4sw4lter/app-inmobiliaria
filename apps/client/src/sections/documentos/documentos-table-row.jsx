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
import { Container } from '@mui/material';
import { deleteDocById } from '../../helpers/deleteDoc';

// ----------------------------------------------------------------------

export default function DocumentosTableRow({
  selected,
  id,
  name,
  filename,
  ownerId,
  reference,
  handleClick,
  fetchDocs
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
    deleteDocById(id);
    setOpenDialog(false);
    setOpen(null);
    fetchDocs();
  };


  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  
  const handleOpenFile = () => {
    const path = `../../../public/docs/${filename}`
    window.open(path, '_blank');
  }

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `../../../public/docs/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>

        <TableCell>{name}</TableCell>

        <TableCell >{filename}</TableCell>

        <TableCell >
          {reference == 'users'
            ? (ownerId)
            : (<NavLink to={`/backoffice/${reference}/ver/${ownerId}`}>{ownerId}</NavLink>)
          }
          
        </TableCell>

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
          sx: { width: 140, border: '1px solid #ccc' },
        }}
      >

        <MenuItem sx={{ border: '1px solid #ccc' }}>
          <Button onClick={handleOpenFile}>
            <Iconify icon="eva:eye-fill" sx={{ mr: 2 }} />
            Ver
          </Button>
        </MenuItem>

        <MenuItem sx={{ border: '1px solid #ccc' }}>
          <Button onClick={handleDownload}>
            <Iconify icon="eva:download-fill" sx={{ mr: 0 }} />
            Descargar
          </Button>
        </MenuItem >

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
              ¿Estás seguro de que deseas borrar este documento?
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

DocumentosTableRow.propTypes = {
  handleClick: PropTypes.func,
  name: PropTypes.any,
  selected: PropTypes.any,
  filename: PropTypes.string,
  ownerId: PropTypes.string,
  reference: PropTypes.string,
  id: PropTypes.string,
};

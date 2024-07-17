import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { NavLink } from 'react-router-dom';

import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  name,
  lastname,
  email,
  role,
  isVerified,
  status,
  handleClick,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>

        <TableCell sx={{ border: '1px solid #ccc', width: '5%' }}><Avatar alt={name} src="" /></TableCell>

        <TableCell component="th" sx={{ border: '1px solid #ccc' }}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </TableCell>

        <TableCell sx={{ border: '1px solid #ccc' }}>{lastname}</TableCell>

        <TableCell sx={{ border: '1px solid #ccc' }}>{email}</TableCell>

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
        <NavLink to={`/backoffice/users/`} className='nav-item nav-link' key="ver">
          <MenuItem sx={{ border: '1px solid #ccc' }}>
            <Button>
              <Iconify icon="eva:eye-fill" sx={{ mr: 2 }} />
              Ver
            </Button>
          </MenuItem>
        </NavLink>

        <NavLink to={`/backoffice/users/`} className='nav-item nav-link' key="editar">
          <MenuItem sx={{ border: '1px solid #ccc' }}>
            <Button>
              <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
              Editar
            </Button>
          </MenuItem >
        </NavLink>


        <MenuItem sx={{ color: 'error.main', border: '1px solid #ccc' }}>
          <Button>
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            Borrar
          </Button>
        </MenuItem>

      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};

import { useState, useEffect } from 'react';
import { Parser } from '@json2csv/plainjs';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users } from '../../../_mock/user';

import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';

import TableNoData from '../table-no-data';
import ClienteTableRow from '../cliente-table-row';
import ClienteTableHead from '../cliente-table-head';
import TableEmptyRows from '../table-empty-rows';
import ClienteTableToolbar from '../cliente-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { useFetchListaClientes } from "../../../hooks/useFetchListaClientes";

// ----------------------------------------------------------------------

export default function ListaClientesView() {
  const { listaClientes, isLoading } = useFetchListaClientes();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('nombre');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataFiltered, setDataFiltered] = useState(listaClientes);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dataFiltered.map((n) => n.nombre);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, nombre) => {
    const selectedIndex = selected.indexOf(nombre);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, nombre);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const goToPreviousPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const goToNextPage = () => {
    if ((page + 1) * rowsPerPage < dataFiltered.length) setPage(page + 1);
  };

  useEffect(() => {
    if (!isLoading) {
      const aux = applyFilter({
        inputData: listaClientes,
        comparator: getComparator(order, orderBy),
        filterName,
      });
      setDataFiltered(aux);
    }
  }, [listaClientes, isLoading, filterName, order, orderBy]);

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Lista de Clientes</Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          href="/backoffice/clientes/crear"
        >
          Agregar Cliente
        </Button>
      </Stack>

      <Card>
        <ClienteTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          data={dataFiltered}
        />

        <TablePagination
          page={page}
          component="div"
          count={dataFiltered.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[10, 50, 100]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página:"
        />

        <Scrollbar sx={{ maxHeight: 400 }}>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>

              <ClienteTableHead
                order={order}
                orderBy={orderBy}
                rowCount={dataFiltered.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'dni', label: 'DNI' },
                  { id: 'apellido', label: 'Apellido' },
                  { id: 'nombre', label: 'Nombre' },
                  { id: 'correo', label: 'Correo' },
                  { id: 'telefono', label: 'Teléfono' },
                  { id: 'celular', label: 'Celular' },
                ]}
              />

              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <ClienteTableRow
                      key={row._id}
                      id={row._id}
                      dni={row.dni}
                      apellido={row.apellido}
                      name={row.nombre}
                      correo={row.correo}
                      telefono={row.telefono}
                      celular={row.celular}
                      selected={selected.indexOf(row.nombre) !== -1}
                      handleClick={(event) => handleClick(event, row.nombre)}
                    />
                  ))}
                <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, dataFiltered.length)} />
                {notFound && <TableNoData query={filterName} />}
              </TableBody>

            </Table>
          </TableContainer>
        </Scrollbar>



      </Card>
    </>
  );
}

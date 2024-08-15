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

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [dataFiltered, setDataFiltered] = useState(listaClientes);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = listaClientes.map((n) => n.nombre);
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

  useEffect(() => {
    if (!isLoading) {
      let aux = applyFilter({
        inputData: listaClientes,
        comparator: getComparator(order, orderBy),
        filterName,
      })
      setDataFiltered(aux)
    }
  }, [listaClientes, isLoading, filterName]);
  

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Lista de Clientes</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} href="/backoffice/clientes/crear">
          Agregar Cliente
        </Button>
      </Stack>

      <Card>
        <ClienteTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          data={listaClientes}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <ClienteTableHead
                order={order}
                orderBy={orderBy}
                rowCount={3}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'dni', label: 'DNI' },
                  { id: 'apellido', label: 'Apellido' },
                  { id: 'name', label: 'Nombre' },
                  { id: 'correo', label: 'Correo' },
                  { id: 'telefono', label: 'Telefono' },
                  { id: 'celuluar', label: 'Celular' },
                ]}
              />
              <TableBody>
                {dataFiltered &&
                  dataFiltered
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

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, 3)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={3}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por pagina:"
        />
      </Card>
    </>
  );
}

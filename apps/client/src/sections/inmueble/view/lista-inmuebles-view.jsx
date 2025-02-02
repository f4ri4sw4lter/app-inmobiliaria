import { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';

import TableNoData from '../table-no-data';
import InmuebleTableRow from '../inmueble-table-row';
import InmuebleTableRowFilter from '../inmueble-table-row-filter';
import InmuebleTableHead from '../inmueble-table-head';
import TableEmptyRows from '../table-empty-rows';
import InmuebleTableToolbar from '../inmueble-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { useFetchListaInmuebles } from "../../../hooks/useFetchListaInmuebles";

import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

export default function ListaInmuebleView() {
  const { listaInmuebles, isLoading } = useFetchListaInmuebles();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('id');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filterTipo, setFilterTipo] = useState('');
  const [filterContrato, setFilterContrato] = useState('');
  const [filterEstado, setFilterEstado] = useState('');
  const [filterInfantes, setFilterInfantes] = useState('');
  const [filterMascotas, setFilterMascotas] = useState('');
  const [filterCochera, setFilterCochera] = useState('');


  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = listaInmuebles.map((n) => n.titulo);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const dataFiltered = applyFilter({
    inputData: listaInmuebles,
    comparator: getComparator(order, orderBy),
    filterTipo,
    filterName,
    filterContrato,
    filterEstado,
    filterInfantes,
    filterMascotas,
    filterCochera
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Lista Inmuebles</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} href="/backoffice/inmuebles/crear">
          Agregar Inmueble
        </Button>
      </Stack>

      <Card>
        <InmuebleTableToolbar
          numSelected={selected.length}
          onFilterName={handleFilterByName}
          data={dataFiltered}
          filterName={filterName}
        />

        <TablePagination
          page={page}
          component="div"
          count={listaInmuebles.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[10, 50, 100]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por pagina:"
        />

        <Scrollbar sx={{ maxHeight: 600 }}>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <InmuebleTableHead
                order={order}
                orderBy={orderBy}
                rowCount={listaInmuebles.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'titulo', label: 'Titulo' },
                  { id: 'tipo', label: 'Tipo' },
                  { id: 'contrato', label: 'Tipo de contrato' },
                  { id: 'estado', label: 'Estado' },
                  { id: 'infantes', label: 'Infantes', align: 'center' },
                  { id: 'mascotas', label: 'Mascotas', align: 'center' },
                  { id: 'cochera', label: 'Cochera', align: 'center' },
                  { id: 'cant_amb', label: 'Cant. ambientes', align: 'center' },
                  { id: 'cant_hab', label: 'Cant. habitaciones', align: 'center' },
                  { id: 'cant_ba', label: 'Cant. baños', align: 'center' }
                ]}
              />
              <TableBody>
                <InmuebleTableRowFilter
                  onFilterName={handleFilterByName}
                  filterTipo={filterTipo}
                  filterContrato={filterContrato}
                  filterEstado={filterEstado}
                  filterInfantes={filterInfantes}
                  filterMascotas={filterMascotas}
                  filterCochera={filterCochera}
                  setFilterTipo={setFilterTipo}
                  setFilterContrato={setFilterContrato}
                  setFilterEstado={setFilterEstado}
                  setFilterInfantes={setFilterInfantes}
                  setFilterMascotas={setFilterMascotas}
                  setFilterCochera={setFilterCochera}
                />

                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <InmuebleTableRow
                      key={row._id}
                      id={row._id}
                      titulo={row.titulo}
                      tipo={row.tipo}
                      descripcion={row.descripcion}
                      contrato={row.contrato}
                      estado={row.estado}
                      ambientes={row.cant_amb}
                      selected={selected.indexOf(row.name) !== -1}
                      banios={row.cant_ba}
                      habitaciones={row.cant_hab}
                      infantes={row.infantes}
                      mascotas={row.mascotas}
                      cochera={row.cochera}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, listaInmuebles.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

      </Card>
    </>
  );
}

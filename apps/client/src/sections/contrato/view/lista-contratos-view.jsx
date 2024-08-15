import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';

import TableNoData from '../table-no-data';
import ContratoTableRow from '../contrato-table-row';
import ContratoTableHead from '../contrato-table-head';
import TableEmptyRows from '../table-empty-rows';
import ContratoTableToolbar from '../contrato-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { useFetchListaContratos } from '../../../hooks/useFetchListaContratos';

// ----------------------------------------------------------------------

export default function ListaContratosView() {

    const { listaContratos, isLoading, fetchContratos } = useFetchListaContratos();

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('nombre');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [dataFiltered, setDataFiltered] = useState(listaContratos);

    const handleSort = (event, id) => {
        const isAsc = orderBy === id && order === 'asc';
        if (id !== '') {
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(id);
        }
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = listaContratos.map((n) => n.nombre);
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
                inputData: listaContratos,
                comparator: getComparator(order, orderBy),
                filterName,
            })
            setDataFiltered(aux)
        }
    }, [listaContratos, isLoading, filterName]);


    const notFound = !dataFiltered.length && !!filterName;

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Lista de Contratos</Typography>

                <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} href="/backoffice/contratos/crear">
                    Crear Contrato
                </Button>
            </Stack>

            <Card>
                <ContratoTableToolbar
                    numSelected={selected.length}
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                    data={listaContratos}
                />

                <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                        <Table sx={{ minWidth: 800 }}>
                            <ContratoTableHead
                                order={order}
                                orderBy={orderBy}
                                rowCount={3}
                                numSelected={selected.length}
                                onRequestSort={handleSort}
                                onSelectAllClick={handleSelectAllClick}
                                headLabel={[
                                    { id: 'inmueble', label: 'Inmueble' },
                                    { id: 'propietario', label: 'Propietario' },
                                    { id: 'cliente', label: 'Cliente' },
                                    { id: 'empleado', label: 'Empleado' },
                                    { id: 'fecha', label: 'Fecha' },
                                ]}
                            />
                            <TableBody>
                                {dataFiltered &&
                                    dataFiltered
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => (
                                            <ContratoTableRow
                                                key={row._id}
                                                id={row._id}
                                                inmueble={row.inmueble}
                                                propietario={row.propietario}
                                                cliente={row.cliente}
                                                empleado={row.empleado}
                                                fecha={row.fecha}
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

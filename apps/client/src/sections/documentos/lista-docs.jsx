import { useEffect, useState } from "react";
import { useFetchListaDocs } from "../../hooks/useFetchListaDocs";
import { emptyRows, applyFilter, getComparator } from './utils';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';

import TableNoData from './table-no-data';
import DocumentosTableRow from './documentos-table-row';
import DocumentosTableHead from './documentos-table-head';
import TableEmptyRows from './table-empty-rows';
import DocumentosTableToolbar from './documentos-table-toolbar';
import { ModalCreateDocs } from "./modal-create-docs";
export default function ListaDocs({ reference, ownerId }) {

    const { listaDocs, isLoadingDocs, fetchDocs } = useFetchListaDocs(ownerId);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('nombre');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [dataFiltered, setDataFiltered] = useState(listaDocs);

    const handleSort = (event, id) => {
        const isAsc = orderBy === id && order === 'asc';
        if (id !== '') {
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(id);
        }
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = listaDocs.map((n) => n.nombre);
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
        if (!isLoadingDocs) {
            let aux = applyFilter({
                inputData: listaDocs,
                comparator: getComparator(order, orderBy),
                filterName,
            })
            setDataFiltered(aux)
        }
    }, [listaDocs, isLoadingDocs, filterName]);


    const notFound = !dataFiltered.length && !!filterName;

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" sx={{ color: 'primary.main' }}>Documentos</Typography>
                <ModalCreateDocs fetchDocs={fetchDocs} reference={reference} ownerId={ownerId} />
            </Stack>

            <Card>
                <DocumentosTableToolbar
                    numSelected={selected.length}
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                />

                <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                        <Table sx={{ minWidth: 800 }}>
                            <DocumentosTableHead
                                order={order}
                                orderBy={orderBy}
                                rowCount={3}
                                numSelected={selected.length}
                                onRequestSort={handleSort}
                                onSelectAllClick={handleSelectAllClick}
                                headLabel={[
                                    { id: 'name', label: 'Codigo' },
                                    { id: 'filename', label: 'Archivo' },
                                    { id: 'ownerId', label: 'Owner' },
                                ]}
                            />
                            <TableBody>
                                {dataFiltered &&
                                    dataFiltered
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => (
                                            <DocumentosTableRow
                                                key={row._id}
                                                id={row._id}
                                                name={row.name}
                                                filename={row.filename}
                                                reference={row.reference}
                                                ownerId={row.ownerId}
                                                selected={selected.indexOf(row.nombre) !== -1}
                                                handleClick={(event) => handleClick(event, row.nombre)}
                                                fetchDocs={fetchDocs}
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
    )
}
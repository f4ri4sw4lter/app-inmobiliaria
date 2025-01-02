import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Stack, Button, Container, Typography, Grid, Divider, Box } from '@mui/material'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';

import Iconify from '../../../components/iconify';
import { useFetchClienteById } from '../../../hooks/useFetchClienteById';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { getProvinciaById } from '../../../helpers/getProvinciaById';
import { getMunicipioById } from '../../../helpers/getMunicipioById';
import { useFetchInmueblesByCliente } from '../../../hooks/useFetchInmueblesByCliente';
import { useFetchContratoByCliente } from '../../../hooks/useFetchContratoByClienteId';
import ListaDocs from '../../documentos/lista-docs';
import Card from '@mui/material/Card';
import Scrollbar from '../../../components/scrollbar';
import ContratoTableHead from '../../contrato/contrato-table-head';
import TableEmptyRows from '../../contrato/table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../../contrato/utils';
import ContratoTableRow from '../../contrato/contrato-table-row';
import dayjs from "dayjs";


export default function ClienteView() {

    const navigate = useNavigate();
    const { accion, id } = useParams();
    const { cliente, clienteIsLoading } = useFetchClienteById(id);
    const { inmuebles, isLoading, fetchInmueblesByCliente } = useFetchInmueblesByCliente();
    const [municipio, setMunicipio] = useState([]);
    const [provincia, setProvincia] = useState([]);
    const { contrato, contratoIsLoading } = useFetchContratoByCliente(id);

    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('nombre');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [dataFiltered, setDataFiltered] = useState(contrato);

    const handleBack = () => {
        navigate('/backoffice/clientes');
    };

    const handleSort = (event, id) => {
        const isAsc = orderBy === id && order === 'asc';
        if (id !== '') {
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(id);
        }
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = contrato.map((n) => n.nombre);
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
        if (!clienteIsLoading) {
            getProvinciaById(cliente.ubicacion.provincia)
                .then(({ provincias }) => setProvincia(provincias[0].nombre))

            getMunicipioById(cliente.ubicacion.municipio)
                .then(({ municipios }) => setMunicipio(municipios[0].nombre))

            fetchInmueblesByCliente(cliente._id);
        }
    }, [cliente, clienteIsLoading]);

    useEffect(() => {
        if (!contratoIsLoading) {
            let aux = applyFilter({
                inputData: contrato,
                comparator: getComparator(order, orderBy),
                filterName,
            })
            setDataFiltered(aux)
        }
    }, [contrato, contratoIsLoading, filterName]);


    const notFound = !dataFiltered.length && !!filterName;

    return (
        <>
            {!clienteIsLoading &&
                <Box>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <ArrowBack
                            sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'primary.main' }, borderRadius: '50%' }}
                            onClick={handleBack}
                        />
                        <Typography variant="h4">Perfil del cliente</Typography>
                        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:edit-fill" />} href={`/backoffice/clientes/editar/${id}`}>
                            Editar
                        </Button>
                    </Stack>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h4" sx={{ color: 'primary.main' }}>DNI </Typography>
                            <Typography variant="h6" >{cliente.dni}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h4" sx={{ color: 'primary.main' }}>Nombre completo </Typography>
                            <Typography variant="h6" >{cliente.apellido} {cliente.nombre}</Typography>
                        </Grid>

                        <Grid item xs={3}>
                            <Typography variant="h4" sx={{ color: 'primary.main' }}>Genero </Typography>
                            <Typography variant="h6" >{cliente.genero}</Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant="h4" sx={{ color: 'primary.main' }}>Fecha Nacimiento </Typography>
                            <Typography variant="h6" >{dayjs(cliente.fechaNacimiento).format("DD/MM/YYYY")} ({dayjs().diff(dayjs(cliente.fechaNacimiento), "year")} Años)</Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography variant="h4" sx={{ color: 'primary.main' }}>Correo </Typography>
                            <Typography variant="h6" >{cliente.correo}</Typography>
                        </Grid>

                        <Grid item xs={2} >
                            <Typography variant="h4" sx={{ color: 'primary.main' }}>Celular </Typography>
                            <Typography variant="h6" >{cliente.celular}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h4" sx={{ color: 'primary.main' }}>Telefono </Typography>
                            <Typography variant="h6" >{cliente.telefono}</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h4" sx={{ color: 'primary.main' }}>Ubicacion</Typography>
                            <Typography variant="h6" >{cliente.ubicacion['calle']} {cliente.ubicacion['altura']}, {municipio}, {provincia}</Typography>
                        </Grid>
                    </Grid>


                    <Typography variant="h4" sx={{ color: 'primary.main', mt: 5 }}>Inmuebles del cliente</Typography>
                    {!isLoading &&
                        <TableContainer component={Paper}>
                            <br />
                            <Table sx={{ minWidth: 650, border: '1px solid #ccc' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ border: '1px solid #ccc' }}>Titulo</TableCell>
                                        <TableCell sx={{ border: '1px solid #ccc' }}>Estado</TableCell>
                                        <TableCell sx={{ border: '1px solid #ccc' }}>Precio ARS</TableCell>
                                        <TableCell sx={{ border: '1px solid #ccc' }}>Precio USD</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {inmuebles.map((row) => (
                                        <TableRow key={row._id}>
                                            <TableCell sx={{ border: '1px solid #ccc' }}>
                                                <Link href={`/backoffice/inmuebles/ver/${row._id}`}>{row.titulo}</Link>
                                            </TableCell>
                                            <TableCell sx={{ border: '1px solid #ccc' }}>{row.estado}</TableCell>
                                            <TableCell sx={{ border: '1px solid #ccc' }}>{row.precio}</TableCell>
                                            <TableCell sx={{ border: '1px solid #ccc' }}>{row.precioUSD ? row.precioUSD : 'No especificado'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                </Box>
            }
            <br />

            <ListaDocs reference='clientes' ownerId={id} />

            <Card>
                <Typography variant="h4" sx={{ color: 'primary.main' }}>Contratos</Typography>
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

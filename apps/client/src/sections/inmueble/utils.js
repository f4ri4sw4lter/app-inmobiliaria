export const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

export function emptyRows(page, rowsPerPage, arrayLength) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

function descendingComparator(a, b, orderBy) {
  if (a[orderBy] === null) {
    return 1;
  }
  if (b[orderBy] === null) {
    return -1;
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function applyFilter({ inputData, comparator, filterTipo, filterName, filterContrato, filterEstado, filterInfantes, filterMascotas, filterCochera }) {

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterTipo) {
    inputData = inputData.filter(
      (inmueble) => inmueble.tipo.toLowerCase().indexOf(filterTipo.toLowerCase()) !== -1
    );
  }
  
  if (filterName) {
    inputData = inputData.filter(
      (inmueble) => inmueble.titulo.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterContrato) {
    inputData = inputData.filter(
      (inmueble) => inmueble.contrato.toLowerCase().indexOf(filterContrato.toLowerCase()) !== -1
    );
  }

  if (filterEstado) {
    inputData = inputData.filter(
      (inmueble) => inmueble.estado.toLowerCase().indexOf(filterEstado.toLowerCase()) !== -1
    );
  }

  if (filterInfantes) {
    inputData = inputData.filter(
      (inmueble) => inmueble.infantes == filterInfantes
    );
  }

  if (filterMascotas) {
    inputData = inputData.filter(
      (inmueble) => inmueble.mascotas == filterMascotas
    );
  }

  if (filterCochera) {
    inputData = inputData.filter(
      (inmueble) => inmueble.mascotas == filterCochera
    );
  }


  return inputData;
}

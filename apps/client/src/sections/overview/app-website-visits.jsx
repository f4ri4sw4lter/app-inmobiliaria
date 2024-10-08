import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import Chart, { useChart } from '../../components/chart';

// ----------------------------------------------------------------------

export default function AppWebsiteVisits({ title, subheader, chart, ...other }) {
  const { labels, colors, series, options } = chart;

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: '16%',
      },
    },
    fill: {
      type: series.map((i) => i.fill),
    },
    labels,
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false, // Evita que se utilice UTC si quieres manejar la hora local
        format: 'MM/yy', // Formato de fecha en español
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => {
          if (typeof value !== 'undefined') {
            return `${value.toFixed(0)} transacciones`; // Texto en español
          }
          return value;
        },
      },
      x: {
        formatter: (val) => {
          const date = new Date(val);
          return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' }); // Solo muestra mes y año
        },
      },
    },
    locale: 'es', // Configuración para idioma español
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          dir="ltr"
          type="line"
          series={series}
          options={chartOptions}
          width="100%"
          height={364}
        />
      </Box>
    </Card>
  );
}

AppWebsiteVisits.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

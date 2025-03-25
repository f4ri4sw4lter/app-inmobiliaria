import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from '../../../components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';
import { useState } from 'react';
import { useFetchUltimosCincoContratos } from '../../../hooks/useFetchUltimosCincoContratos';
import { useFetchMetrics } from '../../../hooks/useFetchMetrics';
import CircularProgress from '@mui/material/CircularProgress';

// ----------------------------------------------------------------------

export default function AppView() {

  const { ultimosCinco, setUltimosCinco } = useFetchUltimosCincoContratos();
  const { metrics, metricsIsLoading } = useFetchMetrics();

  return (

    <Container maxWidth="xl">

      <Typography variant="h4" sx={{ mb: 5 }}>
        Inmobiliaria Ferreyra
      </Typography>

      {metricsIsLoading && (
        <>
          <Typography variant="h6" sx={{ mt: 5 }}>
            Cargando...
          </Typography>
          <CircularProgress
            sx={{
              position: 'absolute',
            }}
          />
        </>
      )}

      {!metricsIsLoading &&
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total clientes"
              total={metrics.cant_clientes}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Ventas"
              total={metrics.cant_ventas}
              color="success"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Alquileres"
              total={(metrics.cant_alquileres)}
              color="warning"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Mensajes del mes"
              total={metrics.cant_mensajes}
              color="error"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
            />
          </Grid>

          <Grid xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Transacciones del año"
              subheader="ventas/alquileres"
              chart={{
                labels: ['04/01/24', '05/01/24', '06/01/24', '07/01/24', '08/01/24', '09/01/24', '10/01/24', '11/01/24', '12/01/24', '01/01/25'],
                series: [
                  {
                    name: 'Ventas',
                    type: 'column',
                    fill: 'solid',
                    data: Object.values(metrics.contratos_lastyear.ventas).map(Number)
                  },
                  {
                    name: 'Alquileres',
                    type: 'column',
                    fill: 'solid',
                    data: Object.values(metrics.contratos_lastyear.alquileres)
                  }
                ],
              }}
            />
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Contratos"
              chart={{
                series: [
                  { label: 'Ventas', value: metrics.cant_ventas },
                  { label: 'Alquileres', value: metrics.cant_alquileres },
                ],
              }}
            />
          </Grid>

          <Grid xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="Ultimos contratos"
              list={ultimosCinco.map((contrato) => ({
                inmuebleId: contrato.inmueble._id,
                titulo: contrato.inmueble.titulo,
                empleado: contrato.empleado,
                postedAt: contrato.createdAt,
              }))}
            />
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Generos"
              chart={{
                series: [
                  { label: 'Otro', value: metrics.cant_otro },
                  { label: 'Masculino', value: metrics.cant_masculinos },
                  { label: 'Femenino', value: metrics.cant_femeninos },
                ],
              }}
            />
          </Grid>
        </Grid>
      }
    </Container>
  );
}

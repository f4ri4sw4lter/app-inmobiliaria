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

// ----------------------------------------------------------------------

export default function AppView() {

  const { ultimosCinco, setUltimosCinco } = useFetchUltimosCincoContratos();
  const { metrics, metricsIsLoading } = useFetchMetrics();

  if(!metricsIsLoading){
    console.log(Object.values(metrics.contratos_lastyear.alquileres).map(Number))
  }

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Inmobiliaria Ferreyra
      </Typography>

      {! metricsIsLoading &&
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
            title="Ventas del mes"
            total={metrics.cant_ventas}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Alquileres del mes"
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

        <Grid xs={12} md={12} lg={12}>
          <AppWebsiteVisits
            title="Transacciones del año"
            subheader="ventas/alquileres"
            chart={{
              labels: ['01/01/24','02/01/24','03/01/24','04/01/24','05/01/24','06/01/24','07/01/24','08/01/24','09/01/24','10/01/24'],
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
            list = {ultimosCinco.map((contrato) => ({
              inmuebleId: contrato.inmueble._id,
              titulo: contrato.inmueble.titulo,
              empleado: contrato.empleado,
              postedAt: contrato.createdAt,
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Trafico en tus Redes"
            list={[
              {
                name: 'Facebook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>
      </Grid>
      }
    </Container>
  );
}

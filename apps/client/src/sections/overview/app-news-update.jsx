import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

import { fToNow } from '../../utils/format-time';

import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';

// ----------------------------------------------------------------------

export default function AppNewsUpdate({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {list.map((news) => (
            <NewsItem key={news.inmuebleId} news={news} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          href="/backoffice/contratos"
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        >
          Ver todos
        </Button>
      </Box>
    </Card>
  );
}

AppNewsUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

// ----------------------------------------------------------------------

function NewsItem({ news }) {
  const { inmuebleId, titulo, empleado, postedAt } = news;

  const date = new Date(postedAt);

  const formattedDate = date.toLocaleDateString('es-ES', {
    weekday: 'long', 
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Stack direction="row" alignItems="center" spacing={2}>

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap href={`/backoffice/inmuebles/${inmuebleId}`}>
          {titulo}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          Encargad@: {empleado}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {formattedDate}
      </Typography>
    </Stack>
  );
}

NewsItem.propTypes = {
  news: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    postedAt: PropTypes.string,
  }),
};

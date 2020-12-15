import microCors from 'micro-cors';
import { getDddsData } from '../../../../services/ddd';

const CACHE_CONTROL_HEADER_VALUE =
  'max-age=0, s-maxage=86400, stale-while-revalidate, public';
const cors = microCors();

async function CitiesByDdd(request, response) {
  const requestedDdd = request.query.ddd;

  response.setHeader('Cache-Control', CACHE_CONTROL_HEADER_VALUE);

  try {
    const allDddData = await getDddsData();

    const dddData = allDddData.filter(({ ddd }) => ddd === requestedDdd);

    if (dddData.length === 0) {
      response.status(404);
      response.json({
        name: 'dddError',
        message: 'DDD não encontrado',
        type: 'DDD_NOT_FOUND',
      });

      return;
    }

    response.status(200);
    response.json(dddData);
  } catch (error) {
    response.status(500);
    response.json({
      name: 'dddError',
      message: 'Ocorreu um erro ao ler ou processar a fonte DDD',
      type: 'service_error',
    });
  }
}

export default cors(CitiesByDdd);

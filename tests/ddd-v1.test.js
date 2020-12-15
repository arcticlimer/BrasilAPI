const axios = require('axios');

const requestUrl = `${global.SERVER_URL}/api/ddd/v1`;

describe('api/ddd/v1 (E2E)', () => {
  test('Utilizando um DDD válido: 17', async () => {
    const response = await axios.get(`${requestUrl}/17`);
    const { data, status } = response;

    expect(status).toEqual(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data[0]).toHaveProperty('ibgeCode');
    expect(data[0]).toHaveProperty('uf');
    expect(data[0]).toHaveProperty('cidade');
    expect(data[0]).toHaveProperty('ddd');
  });

  test('Utilizando um DDD inexistente: 01', async () => {
    const invalidResponse = {
      name: 'dddError',
      message: 'DDD não encontrado',
      type: 'DDD_NOT_FOUND',
    };

    try {
      await axios.get(`${requestUrl}/01`);
    } catch (error) {
      const { response } = error;
      const { data, status } = response;

      expect(status).toEqual(404);
      expect(data).toEqual(invalidResponse);
    }
  });
});

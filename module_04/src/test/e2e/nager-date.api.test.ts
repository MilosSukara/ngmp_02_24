import request from 'supertest';
import { PUBLIC_HOLIDAYS_API_URL } from '../../config';
import { PublicHoliday } from '../../types';

export const contains = (equals: (arg0: any, arg1: any) => any, list: any[], value: any) => {
  return list.findIndex((item: any) => equals(item, value)) > -1;
};

const SAMPLE_COUNTRY = "GB";
const SAMPLE_INVALID_COUNTRY = "GB1";
const SAMPLE_YEAR = (new Date()).getFullYear();

describe('Nager.Date.API', () => {
  describe('/PublicHolidays', () => {
    test('should return 200 and a list of public holidays', async () => {
      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(`/PublicHolidays/${SAMPLE_YEAR}/${SAMPLE_COUNTRY}`);

      expect(status).toEqual(200);
      body.forEach((element: any) => {
        expect(element).toMatchObject({
          date: expect.any(String),
          localName: expect.any(String),
          name: expect.any(String),
          countryCode: expect.any(String),
          fixed: expect.any(Boolean),
          global: expect.any(Boolean),
          types: expect.any(Array)
        });
        expect(element).toHaveProperty("launchYear");
        expect(element).toHaveProperty('counties');
      });
    });
    test('should return 404 if country code is unknown', async () => {
      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(`/PublicHolidays/${SAMPLE_YEAR}/${SAMPLE_INVALID_COUNTRY}`);

      expect(body).toEqual(expect.objectContaining({
        type: expect.any(String),
        title: expect.any(String),
        status: expect.any(Number),
        traceId: expect.any(String),
      }));

      expect(status).toEqual(404);
    });
    test('should return 400 if year is not supported', async () => {
      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(`/PublicHolidays/-11/${SAMPLE_COUNTRY}`);

      expect(body).toEqual(expect.objectContaining({
        title: expect.any(String),
        status: expect.any(Number),
        errors: expect.any(Object),
      }));
      expect(status).toEqual(400);
    });
  });
  describe('/IsTodayPublicHoliday', () => {
    test('should return 200 or 204 depending if today is holday or not', async () => {
      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(`/IsTodayPublicHoliday/${SAMPLE_COUNTRY}`);

      expect(body).toMatchObject({});
      expect([200, 204].includes(status)).toEqual(true);
    });
    test('should return 404 if country code is unknown', async () => {
      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(`/IsTodayPublicHoliday/${SAMPLE_INVALID_COUNTRY}`);

      expect(body).toEqual(expect.objectContaining({
        type: expect.any(String),
        title: expect.any(String),
        status: expect.any(Number),
        traceId: expect.any(String),
      }));
      expect(status).toEqual(404);
    });
    test('should return 400 if validation fails', async () => {
      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(`/IsTodayPublicHoliday/%20`);
      expect(body).toEqual(expect.objectContaining({
        type: expect.any(String),
        title: expect.any(String),
        status: expect.any(Number),
        traceId: expect.any(String),
      }));
      expect(status).toEqual(400);
    });
  })
});

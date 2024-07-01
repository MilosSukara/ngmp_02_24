import axios from "axios";
import { checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays } from "../../services/public-holidays.service";

const SAMPLE_COUNTRY = "GB";
const SAMPLE_PUBLIC_HOLIDAY = {
  "date": "2024-01-01",
  "localName": "New Year's Day",
  "name": "New Year's Day",
  "countryCode": "GB",
  "fixed": false,
  "global": false,
  "counties": [
    "GB-NIR"
  ],
  "launchYear": null,
  "types": [
    "Public"
  ]
};
const YEAR = (new Date().getFullYear());

describe('Unit: getListOfPublicHolidays', () => {
  test('should return a list of public holidays', async () => {

    const expected = (({ name, localName, date }) => ({ name, localName, date }))(SAMPLE_PUBLIC_HOLIDAY);
    jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.resolve({ data: [SAMPLE_PUBLIC_HOLIDAY] }));

    const response = await getListOfPublicHolidays(YEAR, SAMPLE_COUNTRY);

    expect(response).toEqual([expected]);
  });
  test('should return an empty array on error response', async () => {
    jest.spyOn(axios, 'get').mockRejectedValueOnce(() => Promise.resolve(new Error()));

    const response = await getListOfPublicHolidays(YEAR, SAMPLE_COUNTRY);

    expect(response).toEqual([]);
  });
});

describe('Unit: checkIfTodayIsPublicHoliday', () => {
  test('should return true if today is a public holday', async () => {
    jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.resolve({ status: 200 }));
    const response = await checkIfTodayIsPublicHoliday(SAMPLE_COUNTRY);
    expect(response).toBe(true);
  })
  test('should return false if today is not a public holiday', async () => {
    jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.resolve({ status: 204 }));
    const response = await checkIfTodayIsPublicHoliday(SAMPLE_COUNTRY);
    expect(response).toBe(false);
  });

  test('should return false on error response', async () => {
    jest.spyOn(axios, 'get').mockRejectedValueOnce(() => Promise.resolve(new Error()));
    const response = await checkIfTodayIsPublicHoliday(SAMPLE_COUNTRY);

    expect(response).toBe(false);
  });
})

describe('Unit: getNextPublicHolidays', () => {
  test('Should return next public holidays', async () => {
    const expected = (({ name, localName, date }) => ({ name, localName, date }))(SAMPLE_PUBLIC_HOLIDAY);
    jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.resolve({ data: [SAMPLE_PUBLIC_HOLIDAY] }));
    const response = await getNextPublicHolidays(SAMPLE_COUNTRY);

    expect(response).toEqual([expected]);
  });
  test('Should return next public holidays', async () => {
    jest.spyOn(axios, 'get').mockRejectedValueOnce(() => Promise.resolve(new Error()));
    const response = await getNextPublicHolidays(SAMPLE_COUNTRY);

    expect(response).toEqual([]);
  });
})

afterAll(() => {
  jest.clearAllMocks();
})
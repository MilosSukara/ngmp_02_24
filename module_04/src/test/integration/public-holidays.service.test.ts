import { SUPPORTED_COUNTRIES } from "../../config";
import { checkIfTodayIsPublicHoliday, getListOfPublicHolidays } from "../../services/public-holidays.service";

const COUNTRY = SUPPORTED_COUNTRIES[0];

const YEAR = (new Date().getFullYear());

describe('Integration: getListOfPublicHolidays', () => {
  test('should return a list of public holidays', async () => {

    const list = await getListOfPublicHolidays(YEAR, COUNTRY);

    expect(Array.isArray(list)).toBe(true);
    list.forEach((element: any) => {
      expect(element).toMatchObject({
        date: expect.any(String),
        localName: expect.any(String),
        name: expect.any(String),
      });
    })
  });
  test('should throw validation error on invalid year', async () => {
    expect(async () => await getListOfPublicHolidays(-11, COUNTRY)).rejects.toThrowError('Year provided not the current, received: -11');
  });

  test('should throw validation error on invalid country', async () => {
    expect(async () => await getListOfPublicHolidays(YEAR, "GB1")).rejects.toThrowError('Country provided is not supported, received: GB1');
  });
});

describe('Integration: checkIfTodayIsPublicHoliday', () => {
  test('should return a boolean for a valid country', async () => {

    const result = await checkIfTodayIsPublicHoliday(COUNTRY);

    expect(typeof result == "boolean").toBe(true);

  });

  test('should throw validation error on invalid country', async () => {
    expect(async () => await checkIfTodayIsPublicHoliday("GB1")).rejects.toThrowError('Country provided is not supported, received: GB1');
  });
});


describe('getNextPublicHolidays: checkIfTodayIsPublicHoliday', () => {
  test('should return a list of next public holidays', async () => {
    const list = await getListOfPublicHolidays(YEAR, COUNTRY);

    expect(Array.isArray(list)).toBe(true);
    list.forEach((element: any) => {
      expect(element).toMatchObject({
        date: expect.any(String),
        localName: expect.any(String),
        name: expect.any(String),
      });
    })
  });

  test('should throw validation error on invalid country', async () => {
    expect(async () => await checkIfTodayIsPublicHoliday("GB1")).rejects.toThrowError('Country provided is not supported, received: GB1');
  });
});
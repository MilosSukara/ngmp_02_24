import * as helpers from "../../helpers"
import { SUPPORTED_COUNTRIES } from "../../config";

const SAMPLE_COUNTRY = "GB";
const SAMPLE_UNSUPPORTED_COUNTRY = "BA";
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

describe('validating country and year', () => {
  test('should validate a correct country and year', () => {
    const year = new Date().getFullYear();
    expect(helpers.validateInput({ year, country: SAMPLE_COUNTRY })).toBe(true);
  });

  test('should fail validation on incorrect year', () => {
    const year = new Date().getFullYear();
    expect(() => helpers.validateInput({ year: year - 1, country: SAMPLE_COUNTRY })).toThrow(`Year provided not the current, received: ${year - 1}`);
  })

  test('should fail validation on unsupported coutry', () => {
    const year = new Date().getFullYear();
    expect(() => helpers.validateInput({ year: year, country: SAMPLE_UNSUPPORTED_COUNTRY })).toThrow(`Country provided is not supported, received: ${SAMPLE_UNSUPPORTED_COUNTRY}`);
  })
});

describe('shortening public holday', () => {
  test('should shorten public holiday', () => {
    const result = helpers.shortenPublicHoliday(SAMPLE_PUBLIC_HOLIDAY);
    const expected = (({ name, localName, date }) => ({ name, localName, date }))(SAMPLE_PUBLIC_HOLIDAY);

    expect(result).toStrictEqual(expected);
  })
});
import { DriverDto } from '../interfaces/driver.dto';
const UNKNOWN_CODE = 'unknown';

export const mapDriverData = (driverData: DriverDto) => ({
  firstName: driverData.givenName ?? '???',
  code: driverData.code ?? UNKNOWN_CODE,
  lastName: driverData.familyName ?? '????',
  number: driverData.permanentNumber ?? '?'
})

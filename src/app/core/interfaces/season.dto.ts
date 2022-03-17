import { DriverDto } from './driver.dto';

export interface SeasonDto {
  season: string;
  round: string;
  DriverStandings: {
    wins: string; positionText: string;
    Driver: DriverDto;
    Constructors: { nationality: string; name: string; constructorId: string; url: string }[];
    position: string;
    points: string
  }[];
}

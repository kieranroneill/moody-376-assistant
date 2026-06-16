// enums
import { PressureTrendEnum } from '@/enums/weather';

interface WeatherSnapshot {
  airTemperature: number;
  condition: string;
  gustKts: number;
  pressureHpa: number;
  pressureTrend: PressureTrendEnum;
  seaState: string;
  updatedAt: string;
  visibilityNm: number;
  waterTemperature: number;
  windSpeedKts: number;
  windDirection: string;
}

export default WeatherSnapshot;

interface PowerReading {
  engineCharging: boolean;
  estimatedHoursRemaining: number;
  batteryPercentageRemaining: number;
  batteryVoltage: number;
  loadAmps: number;
  shorePower: boolean;
  solarInputAmps: number;
  updatedAt: string;
}

export default PowerReading;

interface PowerReading {
  batteryPercentageRemaining: number;
  batteryVoltage: number;
  engineCharging: boolean;
  estimatedHoursRemaining: number;
  loadAmps: number;
  shorePower: boolean;
  solarInputAmps: number;
  updatedAt: string;
}

export default PowerReading;

// enums
import { AlertSeverityEnum } from '@/enums/notifications';

interface Alert {
  detail: string;
  id: string;
  severity: AlertSeverityEnum;
  timestamp: string;
  title: string;
}

export default Alert;

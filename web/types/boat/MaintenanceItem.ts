// enums
import { MaintenanceStatusEnum } from '@/enums/boat';

interface MaintenanceItem {
  dueLabel: string;
  id: string;
  title: string;
  status: MaintenanceStatusEnum;
  system: string;
}

export default MaintenanceItem;

// enums
import { ConnectionStatusEnum } from '@/enums/api';
import { MaintenanceStatusEnum } from '@/enums/boat';
import { AlertSeverityEnum } from '@/enums/notifications';
import { PressureTrendEnum } from '@/enums/weather';

// types
import type { ChatSession, ChatSessionSummary } from '@/types/chat';
import type { BoatContext } from '@/types/boat';

// Mock data used as a graceful fallback when the backend routes are not
// reachable (e.g. local development of the frontend in isolation).
// The real data is fetched from /api/context and /api/sessions.

export const mockContext: BoatContext = {
  details: {
    id: 'boat-1',
    name: 'Blaise',
    model: '376',
    make: 'Moody',
    year: 1985,
    lengthMeters: 11.53,
    homePort: 'Gosport',
    hullID: 'SE-HR40C-0192',
    callSign: 'SBAL2',
  },
  connection: ConnectionStatusEnum.Online,
  weather: {
    condition: 'Partly cloudy',
    airTemperature: 14,
    waterTemperature: 11,
    windSpeedKts: 12,
    windDirection: 'SW',
    gustKts: 18,
    pressureHpa: 1014,
    pressureTrend: PressureTrendEnum.Falling,
    visibilityNm: 8,
    seaState: 'Slight, 0.5–1.0 m',
    updatedAt: new Date().toISOString(),
  },
  power: {
    batteryPercentageRemaining: 78,
    batteryVoltage: 12.7,
    loadAmps: 6.4,
    solarInputAmps: 3.2,
    shorePower: false,
    engineCharging: false,
    estimatedHoursRemaining: 22,
    updatedAt: new Date().toISOString(),
  },
  consumers: [
    { id: 'c1', name: 'Refrigeration', amps: 3.1 },
    { id: 'c2', name: 'Navigation / Plotter', amps: 1.2 },
    { id: 'c3', name: 'Autopilot (standby)', amps: 0.8 },
    { id: 'c4', name: 'Cabin lighting', amps: 0.7 },
    { id: 'c5', name: 'Instruments', amps: 0.6 },
  ],
  instruments: [
    { id: 'i1', label: 'Depth', value: '14.2', unit: 'm' },
    { id: 'i2', label: 'SOG', value: '0.0', unit: 'kts' },
    { id: 'i3', label: 'Heading', value: '212', unit: '°M' },
    { id: 'i4', label: 'Wind (AWA)', value: '42', unit: '°' },
    { id: 'i5', label: 'Water temp', value: '11', unit: '°C' },
    { id: 'i6', label: 'Bilge', value: 'Dry' },
  ],
  maintenance: [
    {
      id: 'm1',
      title: 'Engine oil & filter change',
      system: 'Propulsion',
      status: MaintenanceStatusEnum.Due,
      dueLabel: 'Due in 12 engine hrs',
    },
    {
      id: 'm2',
      title: 'Replace impeller (raw water pump)',
      system: 'Cooling',
      status: MaintenanceStatusEnum.Overdue,
      dueLabel: 'Overdue by 30 days',
    },
    {
      id: 'm3',
      title: 'Inspect standing rigging',
      system: 'Rig',
      status: MaintenanceStatusEnum.OK,
      dueLabel: 'Next: spring haul-out',
    },
    {
      id: 'm4',
      title: 'Service winches',
      system: 'Deck',
      status: MaintenanceStatusEnum.OK,
      dueLabel: 'Next: 3 months',
    },
  ],
  logbook: [
    {
      id: 'l1',
      title: 'Anchored, Käringön',
      body: 'Set anchor in 6 m, sand. 30 m chain out. Holding well in SW 12 kts.',
      author: 'Skipper',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    },
    {
      id: 'l2',
      title: 'Departure, Gothenburg',
      body: 'Slipped lines 08:15. Motored out of harbour, hoisted main at fairway buoy.',
      author: 'Skipper',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString(),
    },
  ],
  alerts: [
    {
      id: 'a1',
      severity: AlertSeverityEnum.Warning,
      title: 'Raw water impeller overdue',
      detail: 'Replace before next engine run to avoid overheating.',
      timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    },
    {
      id: 'a2',
      severity: AlertSeverityEnum.Info,
      title: 'Barometric pressure falling',
      detail: 'Pressure down 4 hPa in 3 hrs. Monitor for changing conditions.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
  ],
};

export const mockSessions: ChatSessionSummary[] = [
  {
    id: 's1',
    title: 'Freshwater pump troubleshooting',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    preview: 'The pump cycles but no water reaches the tap…',
  },
  {
    id: 's2',
    title: 'Battery usage review',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    preview: "Summarize today's battery usage and overnight draw.",
  },
  {
    id: 's3',
    title: 'Engine maintenance checklist',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
    preview: 'Find the maintenance checklist for the engine.',
  },
];

export const mockSessionDetail = (id: string): ChatSession => ({
  id,
  title: mockSessions.find((s) => s.id === id)?.title ?? 'Conversation',
  updatedAt: new Date().toISOString(),
  preview: '',
  messages: [],
});

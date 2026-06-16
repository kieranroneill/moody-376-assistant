import { Battery, Gauge, CloudSun, Wrench, NotebookPen, ListChecks } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface QuickPrompt {
  label: string;
  prompt: string;
  icon: typeof Battery;
}

export const QUICK_PROMPTS: QuickPrompt[] = [
  { label: 'Show battery status', prompt: 'Show me the current battery status.', icon: Battery },
  { label: 'Summarize power usage', prompt: "Summarize today's power usage.", icon: Gauge },
  { label: 'Check weather', prompt: 'What weather should I pay attention to today?', icon: CloudSun },
  {
    label: 'Troubleshoot a system',
    prompt: 'Help me troubleshoot a system on board.',
    icon: Wrench,
  },
  { label: 'Create a log entry', prompt: 'Create a log entry for departure from harbor.', icon: NotebookPen },
  {
    label: 'Find a maintenance checklist',
    prompt: 'Find the maintenance checklist for the engine.',
    icon: ListChecks,
  },
];

export function QuickPrompts({ onSelect, disabled }: { onSelect: (prompt: string) => void; disabled?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {QUICK_PROMPTS.map(({ label, prompt, icon: Icon }) => (
        <Button
          key={label}
          variant="outline"
          size="sm"
          disabled={disabled}
          onClick={() => onSelect(prompt)}
          className="h-9 rounded-full"
        >
          <Icon data-icon="inline-start" />
          {label}
        </Button>
      ))}
    </div>
  );
}

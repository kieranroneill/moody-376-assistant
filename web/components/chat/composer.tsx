'use client';

import { useRef, useState } from 'react';
import { ArrowUp, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function Composer({
  onSend,
  isStreaming,
  disabled,
}: {
  onSend: (value: string) => void;
  isStreaming: boolean;
  disabled?: boolean;
}) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function submit() {
    const trimmed = value.trim();
    if (!trimmed || isStreaming || disabled) return;
    onSend(trimmed);
    setValue('');
    requestAnimationFrame(() => {
      if (textareaRef.current) textareaRef.current.style.height = 'auto';
    });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }

  return (
    <div className="flex items-end gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm focus-within:border-foreground/30">
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        rows={1}
        disabled={disabled}
        placeholder="Ask about systems, power, weather, maintenance, or the logbook…"
        className="max-h-40 min-h-11 resize-none border-0 bg-transparent px-2 py-2.5 text-sm leading-relaxed shadow-none focus-visible:ring-0 dark:bg-transparent"
        aria-label="Message the onboard assistant"
      />
      <Button
        size="icon"
        onClick={submit}
        disabled={(!value.trim() && !isStreaming) || disabled}
        className="size-11 shrink-0 rounded-xl"
        aria-label={isStreaming ? 'Assistant responding' : 'Send message'}
      >
        {isStreaming ? <Square className="size-4" /> : <ArrowUp className="size-5" />}
      </Button>
    </div>
  );
}

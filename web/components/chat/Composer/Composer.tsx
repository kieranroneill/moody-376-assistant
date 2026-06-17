'use client';

import { useT } from 'next-i18next/client';
import { ArrowUp, Square } from 'lucide-react';
import { type ChangeEvent, type FC, type KeyboardEvent, useCallback, useRef, useState } from 'react';

// components
import Button from '@/components/ui/Button';
import Textarea from '@/components/ui/Textarea';

// types
import type { Props } from './types';

const Composer: FC<Props> = ({ onSend, isStreaming, disabled }) => {
  const { t } = useT();
  // refs
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // states
  const [value, setValue] = useState('');
  // callbacks
  const handleOnChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);

    event.target.style.height = 'auto';
    event.target.style.height = `${Math.min(event.target.scrollHeight, 160)}px`;
  }, []);
  const handleOnKeyDown = useCallback((event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleOnSubmit();
    }
  }, []);
  const handleOnSubmit = useCallback(() => {
    const trimmed = value.trim();

    if (!trimmed || isStreaming || disabled) {
      return;
    }

    onSend(trimmed);

    setValue('');

    requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    });
  }, [disabled, isStreaming, onSend, value]);

  return (
    <div className="flex items-end gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm focus-within:border-foreground/30">
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
        rows={1}
        disabled={disabled}
        placeholder="Ask about systems, power, weather, maintenance, or the logbook…"
        className="max-h-40 min-h-11 resize-none border-0 bg-transparent px-2 py-2.5 text-sm leading-relaxed shadow-none focus-visible:ring-0 dark:bg-transparent"
        aria-label="Message the onboard assistant"
      />

      <Button
        size="icon"
        onClick={handleOnSubmit}
        disabled={(!value.trim() && !isStreaming) || disabled}
        className="size-11 shrink-0 rounded-xl"
        aria-label={isStreaming ? 'Assistant responding' : 'Send message'}
      >
        {isStreaming ? <Square className="size-4" /> : <ArrowUp className="size-5" />}
      </Button>
    </div>
  );
};

export default Composer;

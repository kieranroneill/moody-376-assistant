'use client';
import { Anchor, MessageSquare, Plus, Wrench, Cpu, NotebookPen, Settings } from 'lucide-react';
import { type FC, useMemo } from 'react';

// components
import Button from '@/components/ui/Button';
import ScrollArea from '@/components/ui/ScrollArea';
import Separator from '@/components/ui/Separator';
import Skeleton from '@/components/ui/Skeleton';

// types
import type { NavigationItem, Props } from './types';

// utilities
import { formatRelativeTime } from '@/utilities/date';
import { cn } from '@/utilities/styles';

const Sidebar: FC<Props> = ({ activeNavigation = 'assistant', boat, sessions, loading, onNewChat, onNavigate }) => {
  // memos
  const navigationItems: NavigationItem[] = useMemo(
    () => [
      { icon: MessageSquare, key: 'assistant', label: 'Assistant' },
      { icon: Wrench, key: 'maintenance', label: 'Maintenance' },
      { icon: Cpu, key: 'systems', label: 'Systems' },
      { icon: NotebookPen, key: 'logbook', label: 'Logbook' },
      { icon: Settings, key: 'settings', label: 'Settings' },
    ],
    []
  );

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-4 py-4">
        <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <Anchor className="size-4" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight">Helm Assistant</p>
          {/*<ConnectionStatus status={connection} />*/}
        </div>
      </div>

      <Separator className="bg-sidebar-border" />

      {/* Boat summary */}
      <div className="px-4 py-4">
        {loading ? (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-3 w-24" />
          </div>
        ) : boat ? (
          <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/40 p-3">
            <p className="text-sm font-semibold leading-tight">{boat.profile.name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {boat.specification.make} {boat.specification.model}
            </p>
            <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
              <div>
                <dt className="text-muted-foreground">Year</dt>
                <dd className="font-medium">{boat.profile.year}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">LOA</dt>
                <dd className="font-medium">{(boat.specification.dimensions.loaMm / 1000).toFixed(2)} m</dd>
              </div>

              {boat.profile.homePort && (
                <div className="col-span-2">
                  <dt className="text-muted-foreground">Home port</dt>
                  <dd className="font-medium">{boat.profile.homePort}</dd>
                </div>
              )}
            </dl>
          </div>
        ) : null}
      </div>

      <div className="px-3">
        <Button onClick={onNewChat} className="w-full justify-start">
          <Plus data-icon="inline-start" />
          New chat
        </Button>
      </div>

      {/* Navigation */}
      <nav className="px-3 py-3" aria-label="Primary">
        <ul className="flex flex-col gap-0.5">
          {navigationItems.map(({ label, icon: Icon, key }) => {
            const active = key === activeNavigation;

            return (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => onNavigate?.(key)}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    active
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground'
                  )}
                >
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <Separator className="bg-sidebar-border" />

      {/* Recent conversations */}
      <div className="flex min-h-0 flex-1 flex-col px-3 py-3">
        <p className="px-1 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Recent conversations
        </p>
        <ScrollArea className="min-h-0 flex-1">
          {loading ? (
            <div className="flex flex-col gap-2 px-1">
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <ul className="flex flex-col gap-0.5">
              {sessions.map((session) => (
                <li key={session.id}>
                  <button
                    type="button"
                    className="flex w-full flex-col items-start gap-0.5 rounded-lg px-3 py-2 text-left transition-colors hover:bg-sidebar-accent/60"
                  >
                    <span className="line-clamp-1 text-sm font-medium">{session.title}</span>
                    <span className="flex w-full items-center justify-between gap-2">
                      <span className="line-clamp-1 text-xs text-muted-foreground">{session.preview}</span>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {formatRelativeTime(session.updatedAt)}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default Sidebar;

'use client';
import { useT } from 'next-i18next/client';
import { Menu, PanelRight } from 'lucide-react';
import { type FC, useCallback, useEffect, useState } from 'react';

// components
import Button from '@/components/ui/Button';
import ChatPanel from '@/components/chat/ChatPanel';
import ContextRail from '@/components/context/ContextRail';
import Sheet from '@/components/ui/Sheet';

// containers
import Sidebar from '@/containers/Sidebar';

// enums
import { ConnectionStatusEnum } from '@/enums';

// hooks
import useStore from '@/hooks/useStore';
import useChatSession from '@/hooks/useChatSession';
import useChatSessions from '@/hooks/useChatSessions';

const App: FC = () => {
  const { t } = useT();
  // hooks
  const boat = useStore(({ boat }) => boat);
  const fetchBoat = useStore(({ fetchBoat }) => fetchBoat);
  const fetchingBoat = useStore(({ fetchingBoat }) => fetchingBoat);
  const {
    activity,
    error: chatError,
    isStreaming,
    messages,
    send: sendChatMessage,
    reset: resetChat,
    retry: retryChatMessage,
  } = useChatSession();
  const { fetch: fetchChatSessions, loading: chatSessionsLoading, sessions } = useChatSessions();
  // states
  const [contextOpen, setContextOpen] = useState(false);
  const [activeNavigation, setActiveNavigation] = useState('assistant');
  const [navigationOpen, setNavigationOpen] = useState(false);
  // callbacks
  const handleOnContextOpenClick = useCallback(() => setContextOpen(true), [setContextOpen]);
  const handleOnMobileNavigate = useCallback(
    (value: string) => {
      setActiveNavigation(value);
      setNavigationOpen(false);
    },
    [setActiveNavigation, setNavigationOpen]
  );
  const handleOnNavigationOpenClick = useCallback(() => setNavigationOpen(true), [setNavigationOpen]);
  const handleOnNewChat = useCallback(() => {
    resetChat();
    setNavigationOpen(false);
  }, [resetChat, setNavigationOpen]);

  useEffect(() => {
    void fetchBoat();
    void fetchChatSessions();
  }, []);

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background text-foreground">
      {/* desktop sidebar */}
      <aside className="hidden w-72 shrink-0 border-r border-border lg:block">
        <Sidebar
          activeNavigation={activeNavigation}
          boatDetails={boat?.specification}
          connection={ConnectionStatusEnum.Syncing}
          sessions={sessions}
          loading={fetchingBoat}
          onNewChat={handleOnNewChat}
          onNavigate={setActiveNavigation}
        />
      </aside>

      {/* main chat column */}
      <main className="flex min-w-0 flex-1 flex-col">
        {/* adaptive top bar: nav trigger below lg, context trigger below xl */}
        <header className="flex items-center justify-between gap-2 border-b border-border px-4 py-3 xl:hidden">
          <div className="flex min-w-0 items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleOnNavigationOpenClick}
              aria-label={t('common:captions.openNavigation')}
              className="lg:hidden"
            >
              <Menu className="size-5" />
            </Button>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{boat?.profile.name ?? 'Helm Assistant'}</p>

              <p className="truncate text-xs text-muted-foreground">
                {boat?.specification
                  ? `${boat.specification.make} ${boat.specification.model}`
                  : t('common:captions.connecting')}
              </p>
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={handleOnContextOpenClick}>
            <PanelRight data-icon="inline-start" />

            {t('common:labels.context')}
          </Button>
        </header>

        <div className="min-h-0 flex-1">
          <ChatPanel
            activity={activity}
            boatDetails={boat?.specification || null}
            error={chatError}
            isStreaming={isStreaming}
            messages={messages}
            sendMessage={sendChatMessage}
            retryMessage={retryChatMessage}
          />
        </div>
      </main>

      {/* Desktop context rail */}
      <aside className="hidden w-80 shrink-0 overflow-y-auto border-l border-border p-4 xl:block 2xl:w-96">
        <ContextRail context={boat} loading={fetchingBoat} />
      </aside>

      {/* Mobile/tablet navigation drawer */}
      <Sheet open={navigationOpen} onOpenChange={setNavigationOpen}>
        <Sheet.Content side="left" className="w-80 p-0">
          <Sheet.Header className="sr-only">
            <Sheet.Title>{t('common:title.navigation')}</Sheet.Title>

            <Sheet.Description>{t('common:descriptions.sidebar')}</Sheet.Description>
          </Sheet.Header>

          <Sidebar
            activeNavigation={activeNavigation}
            boatDetails={boat?.specification}
            connection={ConnectionStatusEnum.Syncing}
            sessions={sessions}
            loading={fetchingBoat || chatSessionsLoading}
            onNavigate={handleOnMobileNavigate}
            onNewChat={handleOnNewChat}
          />
        </Sheet.Content>
      </Sheet>

      {/* Tablet/mobile context drawer */}
      <Sheet open={contextOpen} onOpenChange={setContextOpen}>
        <Sheet.Content side="right" className="w-full gap-0 overflow-y-auto p-0 sm:max-w-md">
          <Sheet.Header className="border-b border-border">
            <Sheet.Title>{t('common:titles.onboardContext')}</Sheet.Title>

            <Sheet.Description>{t('common:descriptions.onboardContext')}</Sheet.Description>
          </Sheet.Header>

          <div className="p-4">
            <ContextRail context={boat} loading={fetchingBoat} />
          </div>
        </Sheet.Content>
      </Sheet>
    </div>
  );
};

export default App;

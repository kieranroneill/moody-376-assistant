'use client';

import { type FC, useCallback, useEffect, useState } from 'react';
import { Menu, PanelRight } from 'lucide-react';

// components
import { Button } from '@/components/ui/button';
import ChatPanel from '@/components/chat/ChatPanel';
import ContextRail from '@/components/context/ContextRail';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';

// containers
import Sidebar from '@/containers/Sidebar';

// enums
import { ConnectionStatusEnum } from '@/enums/api';

// hooks
import useBoatContext from '@/hooks/useBoatContext';
import useChatSession from '@/hooks/useChatSession';
import useChatSessions from '@/hooks/useChatSessions';

const App: FC = () => {
  // hooks
  const { boatContext, fetch: fetchBoatContext, loading: boatContextLoading } = useBoatContext();
  const {
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
    void fetchBoatContext();
    void fetchChatSessions();
  }, []);

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background text-foreground">
      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 border-r border-border lg:block">
        <Sidebar
          activeNavigation={activeNavigation}
          boatDetails={boatContext?.details}
          connection={boatContext?.connection ?? ConnectionStatusEnum.Syncing}
          sessions={sessions}
          loading={boatContextLoading}
          onNewChat={handleOnNewChat}
          onNavigate={setActiveNavigation}
        />
      </aside>

      {/* Main chat column */}
      <main className="flex min-w-0 flex-1 flex-col">
        {/* Adaptive top bar: nav trigger below lg, context trigger below xl */}
        <header className="flex items-center justify-between gap-2 border-b border-border px-4 py-3 xl:hidden">
          <div className="flex min-w-0 items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleOnNavigationOpenClick}
              aria-label="Open navigation"
              className="lg:hidden"
            >
              <Menu className="size-5" />
            </Button>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{boatContext?.details?.name ?? 'Helm Assistant'}</p>

              <p className="truncate text-xs text-muted-foreground">
                {boatContext?.details ? `${boatContext.details.make} ${boatContext.details.model}` : 'Connecting…'}
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleOnContextOpenClick}>
            <PanelRight data-icon="inline-start" />
            Context
          </Button>
        </header>

        <div className="min-h-0 flex-1">
          <ChatPanel
            boatDetails={boatContext?.details || null}
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
        <ContextRail context={boatContext} loading={boatContextLoading} />
      </aside>

      {/* Mobile/tablet navigation drawer */}
      <Sheet open={navigationOpen} onOpenChange={setNavigationOpen}>
        <SheetContent side="left" className="w-80 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>

            <SheetDescription>Boat summary, conversations, and navigation</SheetDescription>
          </SheetHeader>

          <Sidebar
            activeNavigation={activeNavigation}
            boatDetails={boatContext?.details}
            connection={boatContext?.connection ?? ConnectionStatusEnum.Syncing}
            sessions={sessions}
            loading={boatContextLoading || chatSessionsLoading}
            onNavigate={handleOnMobileNavigate}
            onNewChat={handleOnNewChat}
          />
        </SheetContent>
      </Sheet>

      {/* Tablet/mobile context drawer */}
      <Sheet open={contextOpen} onOpenChange={setContextOpen}>
        <SheetContent side="right" className="w-full gap-0 overflow-y-auto p-0 sm:max-w-md">
          <SheetHeader className="border-b border-border">
            <SheetTitle>Onboard context</SheetTitle>

            <SheetDescription>Live boat status, weather, power, and maintenance</SheetDescription>
          </SheetHeader>

          <div className="p-4">
            <ContextRail context={boatContext} loading={boatContextLoading} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default App;

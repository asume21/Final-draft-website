import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/layout/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import CodeTranslator from "@/pages/code-translator";
import LyricLab from "@/pages/lyric-lab";
import BeatStudio from "@/pages/beat-studio";
import MusicStudio from "@/pages/music-studio";
import CodeBeatStudio from "@/pages/codebeat-studio";
import AIAssistant from "@/pages/ai-assistant";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/dashboard">
        <AppLayout>
          <Dashboard />
        </AppLayout>
      </Route>
      <Route path="/code-translator">
        <AppLayout>
          <CodeTranslator />
        </AppLayout>
      </Route>
      <Route path="/lyric-lab">
        <AppLayout>
          <LyricLab />
        </AppLayout>
      </Route>
      <Route path="/beat-studio">
        <AppLayout>
          <BeatStudio />
        </AppLayout>
      </Route>
      <Route path="/music-studio">
        <AppLayout>
          <MusicStudio />
        </AppLayout>
      </Route>
      <Route path="/codebeat-studio">
        <AppLayout>
          <CodeBeatStudio />
        </AppLayout>
      </Route>
      <Route path="/ai-assistant">
        <AppLayout>
          <AIAssistant />
        </AppLayout>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <Sidebar />
      {children}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

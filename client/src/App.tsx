import { Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import CodeTranslator from "@/pages/CodeTranslator";
import LyricLab from "@/pages/LyricLab";
import BeatStudio from "@/pages/BeatStudio";
import MusicStudio from "@/pages/MusicStudio";
import CodeBeatStudio from "@/pages/CodeBeatStudio";
import AIAssistant from "@/pages/AIAssistant";
import Analytics from "@/pages/Analytics";
import Settings from "@/pages/Settings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen" style={{ backgroundColor: '#0F0F0F', color: '#E5E7EB' }}>
        <Switch>
          <Route path="/" component={Landing} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/code-translator" component={CodeTranslator} />
          <Route path="/lyric-lab" component={LyricLab} />
          <Route path="/beat-studio" component={BeatStudio} />
          <Route path="/music-studio" component={MusicStudio} />
          <Route path="/codebeat-studio" component={CodeBeatStudio} />
          <Route path="/ai-assistant" component={AIAssistant} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/settings" component={Settings} />
          <Route>
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
                <p className="text-gray-400 mb-6">The page you're looking for doesn't exist.</p>
                <a href="/" className="btn btn-primary">Go Home</a>
              </div>
            </div>
          </Route>
        </Switch>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
/* EduSpace recovery style: route a single portrait-first app shell through the recovered screen hierarchy; avoid introducing unrelated dashboard structure. */

import { useState } from "react";
import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import HomePage, { OnboardingPage } from "./pages/Home";
import SearchPage, { RegionsPage, RegionDetailPage } from "./pages/Search";
import { SavedPage, AlertsPage, ProfilePage } from "./pages/Account";
import { AvailabilityPage, SchoolProfilePage } from "./pages/School";
import NotFound from "./pages/NotFound";

function EntryPage() {
  const [onboarded] = useState(() => window.localStorage.getItem("eduspace-onboarded") === "true");
  return onboarded ? <HomePage /> : <OnboardingPage />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={EntryPage} />
      <Route path="/home" component={HomePage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/saved" component={SavedPage} />
      <Route path="/alerts" component={AlertsPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/regions" component={RegionsPage} />
      <Route path="/region/:id" component={RegionDetailPage} />
      <Route path="/school/:id" component={SchoolProfilePage} />
      <Route path="/availability" component={AvailabilityPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

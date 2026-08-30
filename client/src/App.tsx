/* EduSpace recovery style: route a single portrait-first app shell through the recovered screen hierarchy; avoid introducing unrelated dashboard structure. */

import { useState } from "react";
import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ProfileProvider, useProfile } from "./contexts/ProfileContext";
import { DataProvider } from "./contexts/DataContext";
import HomePage, { OnboardingPage } from "./pages/Home";
import SearchPage, { RegionsPage, RegionDetailPage } from "./pages/Search";
import { SavedPage, AlertsPage, ProfilePage } from "./pages/Account";
import { AvailabilityPage, SchoolProfilePage } from "./pages/School";
import { AboutPage, HelpSupportPage, PersonalInfoPage, PrivacyPage, ProfileSetupPage } from "./pages/Additional";
import NotFound from "./pages/NotFound";

function EntryPage() {
  const { profile } = useProfile();
  const [onboarded] = useState(() => window.localStorage.getItem("eduspace-onboarded") === "true" && Boolean(profile.name));
  return onboarded ? <HomePage /> : <OnboardingPage />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={EntryPage} />
      <Route path="/home" component={HomePage} />
      <Route path="/setup" component={ProfileSetupPage} />
      <Route path="/personal-info" component={PersonalInfoPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/support" component={HelpSupportPage} />
      <Route path="/privacy" component={PrivacyPage} />
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
          <ProfileProvider>
            <DataProvider>
              <Toaster />
              <Router />
            </DataProvider>
          </ProfileProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

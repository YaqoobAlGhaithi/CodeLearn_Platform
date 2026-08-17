import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Lesson from "./pages/Lesson";
import Dashboard from "./pages/Dashboard";
import CodePlayground from "./pages/CodePlayground";
import Forum from "./pages/Forum";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Report from "./pages/Report";
import Sponsorship from "./pages/Sponsorship";
import Support from "./pages/Support";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/courses"} component={Courses} />
      <Route path={"/course/:courseId"} component={CourseDetail} />
      <Route path={"/lesson/:courseId/:lessonId"} component={Lesson} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/playground"} component={CodePlayground} />
      <Route path={"/forum"} component={Forum} />
      <Route path={"/about"} component={About} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/faq"} component={FAQ} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/report"} component={Report} />
      <Route path={"/sponsorship"} component={Sponsorship} />
      <Route path={"/support"} component={Support} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
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

export default App;

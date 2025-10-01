import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <>
      <Navigation />
      <HomePage />
      <Toaster />
    </>
  );
}
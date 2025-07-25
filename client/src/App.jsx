import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </ErrorBoundary>
  );
}

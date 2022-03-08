import { Routes, Route, Link, Navigate } from 'react-router-dom';
import ExchangeRates from 'Views/ExchangeRates';

export default function App() {
  return (
    <div>
      <aside>
        <nav>
          <Link to="latest-rates">Get Latest Rates</Link>
          <Link to="currency-conversion">Convert Currency</Link>
        </nav>
      </aside>
      <Routes>
        <Route path="/latest-rates" element={<ExchangeRates />} />
        <Route path="/currency-conversion" element={<ExchangeRates />} />
        <Route path="*" element={<Navigate to="/latest-rates" />} />
      </Routes>
    </div>
  );
}

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Links from './Pages/Links';
import Error from './Pages/Error';

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/encurta_link" element={<Home />} />
        <Route exact path="/encurta_link/Links" element={<Links />} />
        <Route exact path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;

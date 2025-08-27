import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Performance from "./pages/Performance";
import Holdings from "./pages/Holdings";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Performance />} />
        <Route path="/holdings" element={<Holdings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default App;

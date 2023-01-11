import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, Messages } from './pages';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
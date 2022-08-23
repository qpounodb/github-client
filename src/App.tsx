import { Link, Route, Routes } from 'react-router-dom';
import './App.css';

export const App: React.FC = () => {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="about" element={<div>About</div>} />
      </Routes>
    </div>
  );
};

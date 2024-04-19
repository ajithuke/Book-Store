import { Route,Routes } from 'react-router-dom';
// CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
// Pages
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';

function App() {
  return (
    <Routes>
        <Route path='/' element={<h1>Home Page</h1>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
    </Routes>
  );
}

export default App;

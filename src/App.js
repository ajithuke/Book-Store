import { Route,Routes } from 'react-router-dom';
// CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
// Pages

function App() {
  return (
    <Routes>
        <Route path='/' element={<h1>Home Page</h1>} />
        <Route path='/login' element={<h1>Login Page</h1>} />
        <Route path='/register' element={<h1>Register Page</h1>} />
    </Routes>
  );
}

export default App;

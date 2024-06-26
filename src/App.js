import { Route,Routes } from 'react-router-dom';
// CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
// Pages
import HomePage from './pages/Home';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import ListingPage from './pages/List';
import BookDetailPage from './pages/Detail';
import OrdersPage from './pages/Orders';
import ViewOrderDetailspage from './pages/ViewOrderDetails'
// Components
import MyNavbar from './components/NavBar'

function App() {
  return (
    <div>
        <MyNavbar />
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/book/list' element={<ListingPage />} />
            <Route path='/book/view/:bookId' element={<BookDetailPage />} />
            <Route path='/book/orders' element={<OrdersPage />} />
            <Route path='/book/orders/:bookId' element={<ViewOrderDetailspage />} />
        </Routes>
    </div>
  );
}

export default App;

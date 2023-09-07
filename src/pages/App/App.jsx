import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../components/NavBar/NavBar';
import BookPage from '../BookPage/BookPage';
import BookList from '../BookList/BookList';
import UpdateBookPage from '../UpdateBookPage/UpdateBookPage';
import UpdateOrderPage from '../UpdateOrderPage/UpdateOrderPage';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* Route components in here */}
              <Route path="/" element={<BookPage />} />
              <Route path="/books" element={<BookList />} />
              <Route path="/books/add" element={<BookPage />} />
              <Route path="/books/update/:id" element={<UpdateBookPage/>} />
              <Route path="/orders/new" element={<NewOrderPage />} />
              <Route path="/order/update/:id" element={<UpdateOrderPage/>} />
              <Route path="/orders" element={<OrderHistoryPage />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}

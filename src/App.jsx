import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from './utilities/users-service';
// pages
import AuthPage from './pages/AuthPage/AuthPage';
// components
import styles from './App.module.css';
import CreateBook from './components/CreateBook/CreateBook';
import ShowBookList from './components/ShowBookList/ShowBookList';
import ShowBookDetails from './components/ShowBookDetails/ShowBookDetails';
import UpdateBook from './components/UpdateBook/UpdateBook';
import NavBar from './components/NavBar/NavBar';
// css
// import './App.css';

function App() {
  // array destructuring
  const [user, setUser] = useState(getUser());
  
  return (
    <main className={styles.App}>
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route exact path='/' element={<ShowBookList user={user} setUser={setUser}/>} />
            <Route path='/create-book' element={<CreateBook user={user} setUser={setUser}/>} />
            <Route path='/edit-book/:id' element={<UpdateBook user={user} setUser={setUser}/>} />
            <Route path='/show-book/:id' element={<ShowBookDetails user={user} setUser={setUser}/>} />
            
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}

export default App;


import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/footer.component';
import Header from './components/header.component';
import HomeView from './views/home.view';
import LoginView from './views/login.view';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<HomeView />} />
        <Route path='/login' element={<LoginView />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

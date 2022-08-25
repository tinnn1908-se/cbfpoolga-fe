import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/footer.component';
import Header from './components/header.component';
import ConfirmEmailView from './views/confirmEmail.view';
import HomeView from './views/home.view';
import LoginView from './views/login.view';
import NFLSheetView from './views/nflsheet.view';
import SignupView from './views/signup.view';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<HomeView />} />
        <Route path='/login' element={<LoginView />} />
        <Route path='/signup' element={<SignupView />} />
        <Route path='/verifyemail/:token' element={<ConfirmEmailView />} />
        <Route path='/nflsheetview' element={<NFLSheetView />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

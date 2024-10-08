
import React from 'react';
import { Container, Garage, Header } from './components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Winners } from './components/winners';

function App() {
  return (
    <div className='bg-bg'>
      <Container classname='app'>
      <BrowserRouter >
        <Header />
        <Routes >
          <Route path="/" element={<Garage />} />
          <Route path="/winners" element={<Winners />} />
        </Routes>
      </BrowserRouter>
    </Container>
    </div>
  );
}

export default App;

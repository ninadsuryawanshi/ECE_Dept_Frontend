import React from 'react';
import styled from 'styled-components';
import HomePage from './components/HomePage';

function App() {
  return (
    <Container>
      <HomePage />
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to right, #000000, #1a1a1a);
`;

export default App;

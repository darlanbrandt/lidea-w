import './styles/global.css';
import { useState } from 'react';
import { StyledEngineProvider } from '@mui/material';
import Header from './components/Header';
import { ContentProvider } from './context/ContentContext';
import Main from './components/Main';
import { Modal } from './components/Modal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <StyledEngineProvider injectFirst>
    <div className="App">
      <ContentProvider>
        <Header onOpenModal={() => setIsModalOpen(true)} />
        <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />
        <Main onOpenModal={() => setIsModalOpen(true)} />
      </ContentProvider>
    </div>
    </StyledEngineProvider>
  );
}

export default App;

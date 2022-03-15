import './styles/global.css';
import { useState } from 'react';
import Header from './components/Header';
import { ContentProvider } from './context/ContentContext';
import Main from './components/Main';
import { Modal } from './components/Modal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }
  return (
    <div className="App">
      <Header onOpenModal={handleOpenModal} />
      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} />
      <ContentProvider>
        <Main />
      </ContentProvider>
    </div>
  );
}

export default App;

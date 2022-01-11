import './styles/global.css';
import Header from './components/Header';
import { ContentProvider } from './context/ContentContext';
import Main from './components/Main';

function App() {
  return (
    <div className='App'>
      <Header />
      <ContentProvider>
        <Main />
      </ContentProvider>
    </div>
  );
}

export default App;

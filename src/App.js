import './App.css';
import Header from './components/page/Header';
import Main from './components/page/Main';
import { ContentProvider } from './context/ContentContext';

function App() {
  return (
    <div className="App">
      <Header />
      <ContentProvider>
        <Main />
      </ContentProvider>
    </div>
  );
}

export default App;

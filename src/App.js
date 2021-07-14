import './App.css';
import Header from './components/page/Header';
import Main from './components/page/Main';
import { ComponentProvider } from './context/ComponentContext';

function App() {
  return (
    <div className="App">
      <Header />
      <ComponentProvider>
        <Main />
      </ComponentProvider>
    </div>
  );
}

export default App;

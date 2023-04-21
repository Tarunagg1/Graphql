import './App.css';
import { useRoutes } from 'react-router';
import { routes } from './routes'
import Navbar from './components/Navbar';

function App() {
  const element = useRoutes(routes)

  return (
    <div className="App">
      <Navbar />
      {element}
    </div>
  );
}

export default App;

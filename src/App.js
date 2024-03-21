import CustomRoutes from './Routes/CustomRoutes';
import { Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="Outer-pokedex">
     <h1 id='pokedex-heading'>
     <Link to='/'>Pokedex</Link>
     </h1>
      <CustomRoutes />
    </div>
  );
}

export default App;

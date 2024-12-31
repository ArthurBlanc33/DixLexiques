import './Navigation.css';
import { Link } from 'react-router-dom';


function Navigation() {
  
  return (
    <nav>
    
      <Link to="/"> <h1 id="nomParc"> DIX-lexiques </h1> </Link>

      <ul className ="navigation">

        <li>
          <Link to="/"> <p> Notre Projet </p> </Link>
        </li>

        <li>
          <Link to="/Page2"> <p> Nos Tests </p>  </Link>
        </li>

        <li>
          <Link to="/PageContact"> <p> Contact </p> </Link>
        </li>
        
      </ul>
      
    </nav>
  );
}export default Navigation
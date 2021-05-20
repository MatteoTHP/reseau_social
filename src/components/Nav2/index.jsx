import { Link } from 'react-router-dom';
import work from 'data/work';
import './nav2.css'
import logo from'./projet.jpg'

const Nav2= () => {
  

    return (
      <nav>
        <div>
         <h1>Projets</h1>
         <div className="image">
            <img src={logo} alt="Logo"></img>
         </div>
         <h2>Au fil des années, nous avons pu accompagner les meilleurs.
         </h2>
         <p>Découvrez pas à pas comment nous avons été présent pour lancer vos marques préférées.
         </p>
           <div>
           {work.map((item, index) => {
             return <p key={index}>
               <Link to={`/works/${item.slug}`}><button className="button">{item.title}</button></Link>
             </p>
           })}
           </div>
        </div>
      </nav>
    );  
 
};
 
export default Nav2;

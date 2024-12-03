import Typography from '@mui/material/Typography';
import "./BestSeler.css";
import Dinamita from '../assets/Dinamita.png';
import Africano from '../assets/Africano.png';
import Europeo from '../assets/Europeo.png';
import latino from '../assets/latino.png';
import Sugar_Daddy from '../assets/Sugar_Daddy.png';

const products = [
    { image: Sugar_Daddy, name: 'SUGGAR DADDY: Para lxs que se la comen pensando en su futuo y en el último i-phone 🫣' },
    { image: Africano, name: 'EL AFRICANO: Hecho para lxs que les gusta que la dejen cojx sino next 👨🏿' },
    { image: Dinamita, name: 'DINAMITA: Hecho con amor para lxs que les encanta que lxs revienten 🤭' },
    { image: Europeo, name: 'EL EUROPEO: Hecho para lxs que no se han comido o extrañan a un europeo 😇' },
    { image: latino, name: 'EL LATINO: Un especial para lxs insaciables y lxs que siempre quieren más 🥳' },
    // Puedes agregar más productos aquí
  ];

export default function BestSeler() {
    return (
        <div className="bestseller-container">
            <div className='contenedor-titulo'>
                <Typography variant="h4" className='titulo-Inicio'>
                    ¡Conoce las más vendidas: NUESTRAS PUNTITAS 🥵!
                </Typography>
            </div>
          <div className="bestseller-grid">
            {products.map((product, index) => (
              <div key={index} className="bestseller-item">
                <div className="image-container">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="overlay">
                    <div className="overlay-text">{product.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}

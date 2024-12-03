import React from 'react';
import './Contacto.css';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const Contacto = () => {
    
  return (
    <div className="contacto-container">
        <div className="contacto-info">
            <h2>#Contáctanos</h2>
            <div className="social-links">
                <div className="social-item-whatsapp">
                <a
                    href="https://api.whatsapp.com/send?phone=51940259838"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-whatsapp"
                >
                    <WhatsAppIcon className="social-icon-whatsapp" />
                </a>
                <p>La Puntita</p>
                </div>
                <div className="social-item-instagram">
                <a
                    href="https://www.instagram.com/lapuntita.peru/?hl=es"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-instagram"
                >
                    <InstagramIcon className="social-icon-instagram" />
                </a>
                <p>@lapuntita.peru</p>
                </div>


                <div className="social-item-facebook">
                <a
                    href="https://www.facebook.com/LaPuntitaPeru"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-facebook"
                >
                    <FacebookIcon className="social-icon-facebook" />
                </a>
                <p>LaPuntitaPeru</p>
                </div>

            </div>
        </div>
        <div className="store-info">
            <h2>Nuestros Locales</h2>

            <div className="store-item">
                <p className="store-location">📍Miraflores: Calle Berlín 167</p>
                <div className="store-image">
                    <iframe
                    src="https://www.google.com/maps/embed?pb=!3m2!1ses-419!2spe!4v1730079556561!5m2!1ses-419!2spe!6m8!1m7!1sQ1Xti66rkvW79Tf5gIkXNQ!2m2!1d-12.12217309292359!2d-77.03176805129874!3f202.29309254133958!4f2.910552690123737!5f0.7820865974627469"
                    width="200%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa Local Miraflores"
                    ></iframe>
                </div>
            </div>

            <div className="store-item">
                <p className="store-location">📍San Miguel: La Marina 2274</p>
                <div className="store-image">
                {/* Aquí puedes agregar una imagen o un mapa */}
                <p>Imagen o dirección del local 2</p>
                </div>
            </div>
        </div>

    </div>
  );
};

export default Contacto;


import TopBar from '@/app/components/TopBar';
import styles from './page.module.css';
import { notFound } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import BottomBar from '@/app/components/BottomBar';


interface BreweryPageProps {
  params: { id: string };
}

export default async function BreweryPage({ params }: BreweryPageProps) {
  const { id } = params;

  // Fetch brewery details based on the dynamic id
  const res = await fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`);

  if (!res.ok) {
    notFound(); // Redirige a 404 si la cervecería no es encontrada
  }

  const brewery = await res.json();

  const repeatArray = new Array(4).fill(null);

  return (
    <div className={styles.breweryContainer}>
      <TopBar showBarsIcon={false} showArrowIcon={true} />

      <h1 className={styles.breweryName}>{brewery.name}</h1>

      <div className={styles.breweryInfo}>
        <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "#ffffff", width: "15px" }} />
        <p className={styles.breweryText}>{brewery.street}, {brewery.city}, {brewery.state}, {brewery.country}</p>
      </div>
      
      <div className={styles.breweryInfo}>
        <FontAwesomeIcon icon={faPhone} style={{ color: "#ffffff", width: "16px" }} />
        <p className={styles.breweryText}>{brewery.phone}</p>
      </div>
      
      <div className={styles.carrousel}>
        <div className={styles.element}><img className={styles.image} src="../images/photo-1.jpg" alt="Image 1" /></div>
        <div className={styles.element}><img className={styles.image} src="../images/photo-2.jpg" alt="Image 2" /></div>
        <div className={styles.element}><img className={styles.image} src="../images/photo-3.jpg" alt="Image 3" /></div>
        <div className={styles.element}><img className={styles.image} src="../images/photo-4.jpg" alt="Image 4" /></div>
      </div>
      
      <h2 className={styles.title}>Opiniones</h2>

      {repeatArray.map((_, index) => (
        <div key={index} className={styles.profileContainer}>
          <div className={styles.profile}>
            <img className={styles.profilePhoto} src="../images/profile-photo.jpg" alt="User" />
            <p className={styles.profileName}>Tom</p>
            <p className={styles.profileResponse}>Responder</p>
          </div>
          <div className={styles.profileComment}>Me encantan este tipo de cervecerías! La velocidad de wifi es muy buena y además el sabor de la IPA roja es muy rica...</div>
        </div>
      ))}
      
      <div className={styles.buttonContainer}>
        <button className={styles.buttonOne}>Reservar mesa</button>
        <button className={styles.buttonTwo}>Opciones de transporte</button>
      </div>

      <BottomBar />

    </div>
  );
}

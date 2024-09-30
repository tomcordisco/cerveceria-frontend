import { useRouter } from 'next/navigation';
import styles from './Carousel.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';

interface CarouselProps {
    items: any[]; // Ajusta el tipo según los datos que vengan de la API
    title: string;
}

export default function Carousel({ items, title }: CarouselProps) {
    const router = useRouter();

    // Función para redirigir al usuario a la vista de detalles
    const handleViewMore = (id: string) => {
        router.push(`/brewery/${id}`); 
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.carrousel}>
                {items.map((item) => (
                    <div key={item.id} className={styles.element}>
                        <h3 className={styles.breweryName}>{item.name}</h3>
                        
                        <div className={styles.breweryInfo}>
                            <img src="../images/photo-1.jpg" alt={item.name} className={styles.image} />
                            <div className={styles.breweryContact}>

                                <div className={styles.breweryAdress}>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "#ffffff", width: "15px" }} />
                                    <p className={styles.breweryText}>{item.street}, {item.city}</p>
                                </div>
                                
                                <div className={styles.breweryAdress}>
                                    <FontAwesomeIcon icon={faPhone} style={{ color: "#ffffff", width: "16px" }} />
                                    <p className={styles.breweryText}>{item.phone}</p>
                                </div>
                            </div>
                        </div>

                        <button
                            className={styles.viewMoreButton}
                            onClick={() => handleViewMore(item.id)}
                        >
                            Ver más
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './BottomBar.module.css';
import { faCalendarAlt, faComment, faHome } from '@fortawesome/free-solid-svg-icons';

export default function BottomBar() {
    return (
        <div className={styles.container}>
            <div className={styles.icons}>
                <FontAwesomeIcon icon={faCalendarAlt} className={styles.icon} />
                <p>Calendario</p>
            </div>

            <div className={styles.icons}>
                <FontAwesomeIcon icon={faHome} className={styles.icon} style={{ color: "#3540e8" }} />
                <p>Inicio</p>
            </div>

            <div className={styles.icons}>
                <FontAwesomeIcon icon={faComment} className={styles.icon} />
                <p>Chat</p>
            </div>
        </div>
    );
}

import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./HappyHour.module.css";

interface HappyHourProps {
    text: string;
}

export default function HappyHour({ text }: HappyHourProps) {
    return (
        <div className={styles.container}>
            <div className={styles.colorBar}></div>
            <FontAwesomeIcon icon={faExclamationCircle} style={{color: "#dd6b20", width:"20px"}} />
            <div className={styles.text}>
                <h2 className={styles.title}>Happy Hour</h2>
                <p className={styles.content}>{text}</p>
            </div>
        </div>

    );
}  
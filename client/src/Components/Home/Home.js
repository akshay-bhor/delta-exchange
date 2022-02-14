import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {

    return (
        <div className={styles.container}>
            <Link to="/login" className={styles.btn}>
                    Login
            </Link>
            <Link to="/register" className={styles.btn}>
                    Register
            </Link>
        </div>
    );
}

export default Home;
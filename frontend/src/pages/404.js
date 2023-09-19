import styles from "../styles/ErrorPage.module.css";
import { useRouter } from "next/router";

export default function ErrorPage() {

    const router = useRouter();

    const navigateHandler = () => {
        router.push('/feeds');
    }

    return (
        <div class={styles.container}>
            <h1>404</h1>
            <p>Page Not Found</p>
            <button class={styles.homeBtn} onClick={navigateHandler}>Go to Home Page</button>
        </div>
    )
}
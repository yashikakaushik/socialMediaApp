import styles from '../styles/Header.module.css';
import { GoMoon } from "react-icons/go";
import Link from 'next/link';
import { useContext , useEffect } from 'react';
import UserContext from '@/store/context';

export default function Header() {

  const ctx = useContext(UserContext);

  console.log(ctx)
  
  useEffect(() => {
    const root = document.documentElement;
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (ctx.view === "dark") {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }

    
    console.log(ctx.view)

    }, [ctx]);

  return (
    <div className={styles.h302Container}>
      <ul className={styles.h139List}>
        <Link href="/"><li className={styles.h391Item}>
          Posts
        </li></Link>
        <Link href="/404"><li className={styles.h391Item}>
          Profile
        </li></Link>
        <li  onClick={()=> ctx.setView()} className={styles.h391Item}>
          <GoMoon size={20} />
        </li>
      </ul>
    </div>
  )
}
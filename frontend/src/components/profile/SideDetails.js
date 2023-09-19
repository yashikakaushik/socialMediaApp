import styles from '../../styles/SideDetails.module.css'
import Image from 'next/image'
import { GoMoon, GoSearch } from "react-icons/go";
import { FaHome } from "react-icons/fa"
import { IoIosNotificationsOutline } from 'react-icons/io';
import { MdOutlineExplore } from 'react-icons/md';
import { BiSolidMessageRounded } from 'react-icons/bi';
import { FcViewDetails } from 'react-icons/fc';
import Link from 'next/link';
import { useContext , useEffect } from 'react';
import UserContext from '@/store/context';


export default function SideDetails() {

    const ctx = useContext(UserContext);

    console.log(ctx)
    
    useEffect(() => {
      const root = document.documentElement;
      if (ctx.view === "dark") {
          root.classList.add('dark');
      } else {
          root.classList.remove('dark');
      }
  
      console.log(ctx.view)
  
      }, [ctx]);

    

    return (
        <div className={styles.sd428Container}>
            <div className={styles.sd390Butterfly}>
                <Link href="/" ><h1>BUTTERFLY</h1></Link>
            </div>

            <div className={styles.sd728Menu}>
                <Link href="/feeds"><span className={styles.sd628MenuItem}><FaHome size={20} />Home</span></Link>
                <Link href="/404"><span className={styles.sd628MenuItem}><GoSearch size={20} />Search</span></Link>
                <Link href="/404"><span className={styles.sd628MenuItem}><FcViewDetails size={20} />Details</span></Link>
                <Link href="/404"><span className={styles.sd628MenuItem}><MdOutlineExplore size={20} />Explore</span></Link>
                <Link href="/404"><span className={styles.sd628MenuItem}><BiSolidMessageRounded size={20} />Messages</span></Link>
                <Link href="/404"><span className={styles.sd628MenuItem}><IoIosNotificationsOutline size={20} />Notifications</span></Link>
            </div>
            <div className={styles.sd294User}>
                <div className={styles.sd829UserName}>
                    <div className={styles.sd194Image}>
                        <Image
                            loading="lazy"
                            src="https://images.unsplash.com/profile-1609545740442-928866556c38image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64"
                            alt="profilepic"
                            width={30}
                            height={30}
                            className={styles.sd847ProfileImage}

                        />
                    </div>
                    <div className={styles.sd456HeaderText}>
                        <p>NEOM</p>
                    </div>
                </div>
                <GoMoon onClick={ctx.setView} size={20} />
            </div>
        </div>
    )
}
import Image from "next/image";
import styles from '../../styles/ImageComponent.module.css'
import { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { MdModeComment } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import { Blurhash } from "react-blurhash";

export default function ImageComponent({ URL, blurHash }) {
    const [isImageLoaded, setIsImageLoaded] = useState(false);


    return (
        <div className={styles.ic428Container}>
            <div className={styles.ic428Posts}>
                <Image
                    loading="lazy"
                    src={URL}
                    alt="post img"
                    layout="fill"
                    objectFit="contain"
                    className={styles.ic156Image}
                    onLoadingComplete={() => {
                        setIsImageLoaded(true)
                    }}
                    style={{
                        opacity: isImageLoaded ? 1 : 0,
                        transition: "opacity 0.3s ease-in-out",
                        zIndex: isImageLoaded ? 1 : -1,
                    }}
                />
                {<Blurhash
                    hash={blurHash}
                    style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        opacity: isImageLoaded ? 0.5 : 1,
                        transition: "opacity 0.3s ease-in-out",
                    }}
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                />}
            </div>
            <div className={styles.ic956Options}>
                <span><AiFillLike size={20} /></span>
                <span><MdModeComment size={20}/></span>
                <span><FaShare size={20} /></span>
            </div>

        </div>
    )
} 
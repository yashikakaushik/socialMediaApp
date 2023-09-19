import Image from "next/image"
import styles from '../../styles/FeedCard.module.css';
import { useState } from "react";
import router from "next/router";
import { AiFillLike } from "react-icons/ai";
import { MdModeComment } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import { Blurhash } from "react-blurhash";
import { useMemo } from "react";


const FeedCard = ({ postData, userName, URL, blurHash, profileImage, isGrid }) => {



    const [isImageLoaded, setIsImageLoaded] = useState(false);

    let userData;
    if (!userName) userData = postData;
    else userData = {
        UserprofileImage: profileImage,
        UserprofileName: userName,
        UserName: userName,
        URL: URL,
        blurHash: blurHash,
        likes: parseInt((Math.random() * 1000)).toLocaleString(),
    };

    const likes = userData.likes;

    const [currLikes, setcurrLikes] = useState(likes);

    const comments = useMemo(() => parseInt((Math.random() * 1000)).toLocaleString(), []);

    const profileHandler = async () => {
        router.push(`/profile/${postData.UserprofileName}`);
    }

    const LikesHandler = () => {
        if (currLikes === likes) setcurrLikes(currLikes + 1);
        else {
            setcurrLikes(currLikes - 1);
        }

    }

    return (
        <div className={styles.feedCard930Container}>
            <div className={styles.feedCard990Header}>
                <div className={styles.feedCard934ProfilePic}>
                    <Image
                        loading="lazy"
                        src={userData.UserprofileImage}
                        alt="profilepic"
                        width={30}
                        height={30}
                        className={styles.fc847ProfileImage}
                        onClick={profileHandler}


                    />
                </div>
                <div className={styles.feedCard456HeaderText}>
                    <p>{userData?.UserName}</p>
                    <p className={styles.fc502ProfileName}>{`@${userData?.UserprofileName}`}</p>
                </div>

            </div>
            <div className={styles.feedCard420Post}>
                <Image
                    loading="lazy"
                    src={userData?.URL}
                    alt="post img"
                    layout="fill"
                    objectFit="contain"
                    className={styles.feedCard230PostImg}
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
                    hash={userData.blurHash}
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
            <div className={styles.fc672Options}>
                <div className={styles.Like}
                    onClick={LikesHandler}
                ><AiFillLike className={styles.Like} />{`${currLikes.toLocaleString()} Likes`}</div>
                <div className={styles.fc378OptionsItem}><MdModeComment />{`${comments} Comments`}</div>
                <div className={styles.fc378OptionsItem}><FaShare /> Share</div>
            </div>
        </div>
    )
}

export default FeedCard;

import Image from "next/image";
import styles from '../../styles/UserInfo.module.css';

export default function UserInfo({ userName, followers, following, bio, posts, profileImage, profileName }) {

    return (
        <div className={styles.ui983Container}>
            <div className={styles.ui402Background} />
            <div className={styles.ui107ImageRow}>
                <Image
                    loader={() => profileImage}
                    src={profileImage}
                    alt="profile image"
                    width={150}
                    height={150}
                    className={styles.ui983ProfileImage}
                />
                <button className={styles.ui983EditProfileButton}>Follow</button>
            </div>
            <div className={styles.ui235Row2}>
                <div className={styles.ui983UserName}>{userName}</div>
                <div className={styles.ui983ProfileName}>{`@${profileName}`}</div>
                <div className={styles.ui983UserBio}>{bio}</div>
            </div>
            <div className={styles.ui761Cards}>
                <div className={styles.ui983Card}>{`${posts} Posts`}</div>
                <div className={styles.ui983Card}>{`${followers} Followers`}</div>
                <div className={styles.ui983Card}>{`${following} Following`}</div>
            </div>
        </div>


    )
} 
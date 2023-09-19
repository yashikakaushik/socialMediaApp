import styles from '../../styles/profilePageIndex.module.css';
import ImageComponent from './ImageComponent.js';
import { useState, useEffect } from 'react';
import UserInfo from './UserInfo';
import { CiViewList } from "react-icons/ci";
import NewsFeedCard from '../newsFeed/index.js';
import { fetchData } from './api';
import ErrorModule from '../ErrorModule.js';
import Loader from '../Loader.js';

export default function ProfilePage({ userName }) {

    const [Loading, setLoading] = useState(false);
    console.log(Loading);

    const [isGrid, setisGrid] = useState(true);

    const [userData, setUserData] = useState([]);

    const [error, setError] = useState("");
    const handleCloseError = () => {
        setError('');
    };

    const viewToggler = () => {
        setisGrid(!isGrid)
    }

    useEffect(() => {
        fetchData(userName, userData, setUserData, setError);
        setLoading(true);
    }, [userName]);

    if (!userData) return null;

    return (
        <>
            {!Loading ? <Loader/> : null}
            {error.length === 0 ? <div className={styles.pp729Container}>
                <div className={styles.pp503UserInfo}>
                    <UserInfo
                        userName={userData?.name}
                        followers={userData?.followers}
                        following={userData?.following}
                        bio={userData?.bio}
                        posts={userData?.photos?.length}
                        profileImage={userData?.profileImage}
                        profileName={userName}
                    />
                </div>
                <span onClick={viewToggler} className={styles.pp825ViewButton}><CiViewList size={40} /></span>
                {isGrid ? <div className={styles.pp379Row}>
                    {userData?.photos?.map((singlePhoto) => {
                        return (
                            <ImageComponent
                                key={singlePhoto?.id}
                                URL={singlePhoto?.URL}
                                blurHash={singlePhoto?.blurHash}
                                isGrid={isGrid}
                            />
                        )
                    }
                    )}
                </div> : <NewsFeedCard isGrid={true} userData={userData} isProfile={true} />}
            </div> :
                <ErrorModule message={error} onClose={handleCloseError} />}
        </>
    )
}
import FeedCard from "./FeedCard";
import styles from "../../styles/newsFeedIndex.module.css";
import { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter } from "next/router";
import { fetchData } from "./api";
import ErrorModule from "../ErrorModule";
import Loader from "../Loader";

export default function NewsFeedCard({ isGrid, userData, isProfile = false }) {

    const [isNewsFeed, setisNewsFeed] = useState(true);
    const [error, setError] = useState("");

    const handleCloseError = () => {
        setError('');
    };

    const router = useRouter();
    if (router.pathname === "/profile/[userName]") setisNewsFeed(false);

    const [postData, setPostData] = useState([]);
    const [pageNumber, setpageNumber] = useState(1);

    useEffect(() => {
        setisNewsFeed(!isProfile);
        fetchData(pageNumber, postData, setPostData, setpageNumber, setError);
    }, [setError]);

    const nextData = () => {
        fetchData(pageNumber, postData, setPostData, setpageNumber, setError);
    }

    return (
        <>
            {error.length === 0 ?
                <div className={styles.i795Container}>
                    <InfiniteScroll
                        dataLength={postData.length} //This is important field to render the next data
                        next={nextData}
                        hasMore={true}
                        loader={<Loader />}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    // below props only if you need pull down functionality
                    >
                        {isNewsFeed ? postData.map((data) =>
                            <FeedCard key={postData.postId} postData={data} />
                        ) :
                            userData?.photos?.map((singlePhoto) => {


                                return (
                                    <FeedCard
                                        key={singlePhoto?.id}
                                        URL={singlePhoto?.URL}
                                        blurHash={singlePhoto?.blurHash}
                                        isGrid={isGrid}
                                        profileImage={userData?.profileImage}
                                        profileName={userData?.userName}
                                        userName={userData?.name}
                                    />
                                )
                            })
                        }

                    </InfiniteScroll>


                </div> :
                <ErrorModule message={error} onClose={handleCloseError} />}
        </>
    )

}
async function checkCache(url) {

    let cacheStorage;

    try {
        cacheStorage = await caches.open('newsFeed');
    } catch (err) {
        return false;
    }
    const cachedResponse = await cacheStorage.match(url);

    if (cachedResponse) {
        return true;
    }
    else {
        return false;
    }

}

const addDataIntoCache = (cacheName, url, response) => {
    const data = new Response(JSON.stringify(response));

    caches.open(cacheName).then((cache) => {
        cache.put(url, data);
    });


};

export async function fetchData(pageNumber, postData, setPostData, setpageNumber, setError) {



    let data;
    let url = `https://api.unsplash.com/photos?page=${pageNumber}`;

    try {

        const cacheStorage = await caches.open('newsFeed');
        const cachedResponse = await cacheStorage.match(url);

        if (checkCache(url) && cacheStorage && cachedResponse) {

            data = await cachedResponse.json();
        }

        else {
            const response = await fetch(url, {
                headers: {
                    Authorization: `Client-ID ${process.env.NEXT_PUBLIC_ACCESS_KEY}`
                }
            });
            if (!response.ok) {
                throw new Error(response.error?.message);
            }

            data = await response.json();
            addDataIntoCache('newsFeed', url, data);
        }

        const postDataTransformed = data?.map((singleData) => {
            return {
                postId: singleData?.id,
                URL: singleData?.urls.full,
                caption: singleData?.alt_description,
                likes: singleData?.likes,
                likedByUser: singleData?.liked_by_user,
                blurHash: singleData?.blur_hash,
                UserId: singleData?.user.id,
                UserName: singleData?.user.name,
                UserprofileName: singleData.user.username,
                UserprofileImage: singleData?.user.profile_image.medium,
            }
        });

        const Pdata = [...postData, ...postDataTransformed];
        setPostData(Pdata);
        setpageNumber(pageNumber + 1);

    } catch (error) {
        setError(error.message);
    }

};

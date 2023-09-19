async function checkCache(userName, url) {

    const cacheStorage = await caches.open(`user${userName}`);
    // Fetching that particular cache data
    const cachedResponse = await cacheStorage.match(url);

    if (cachedResponse) {
        return true;
    }
    else {
        return false;
    }

}

const addDataIntoCache = (cacheName, url, response) => {
    // Converting our response into Actual Response form
    const data = new Response(JSON.stringify(response));

    if ('caches' in window) {
        // Opening given cache and putting our data into it
        caches.open(cacheName).then((cache) => {
            cache.put(url, data);
        });
    }
};

export async function fetchData(userName, userData, setUserData, setError) {

    let data;

    const url = `https://api.unsplash.com/users/${userName}`;

    try {

        const cacheStorage = await caches.open(`user${userName}`);
        const cachedResponse = await cacheStorage.match(url);

        if (checkCache(userName, url) && cacheStorage && cachedResponse) {

            data = await cachedResponse.json();
        }
        else {

            const response = await fetch(url, {
                headers: {
                    Authorization: `Client-ID ${process.env.NEXT_PUBLIC_ACCESS_KEY}`
                }
            });


            if (!response.ok) {

                throw new Error("Something is wrong");
            }
            data = await response.json();

            addDataIntoCache(`user${userName}`, url, data);
        }



        const transformedData = {
            bio: data?.bio,
            followers: data?.followers_count,
            following: data?.following_count,
            profileImage: data?.profile_image?.large,
            name: data?.name,
            photos: data?.photos.map((singlePhoto) => {
                return {
                    id: singlePhoto?.id,
                    URL: singlePhoto?.urls.full,
                    blurHash: singlePhoto?.blur_hash,
                }

            })
        };

        setUserData(transformedData);

    } catch (error) {
        setError(error.message);
    }

};
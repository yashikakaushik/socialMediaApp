import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import ProfilePage from '@/components/profile/Index'

export default function View() {
    let router = useRouter();
    const [username, setUsername] = React.useState(router.query.username);

    useEffect(() => {
        setUsername(router.query.username);
    }, [router.query.username]);

    return (
        <ProfilePage userName={username} />
    )
}
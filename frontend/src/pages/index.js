import { Inter } from 'next/font/google'
import NewsFeed from '../components/newsFeed/index';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <NewsFeed/>
    </>
  )
}

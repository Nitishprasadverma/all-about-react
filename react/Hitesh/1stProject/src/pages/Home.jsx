import Header from "../components/header/Header";
import Channel from '../components/channels/Channel'
import Tags from "../components/tags/Tags"
import Carousel from "../components/carousel/Carousel";
import Featured from "../components/featured/Featured";

import Shows from "../components/shows/Shows";
export default function Home() {
    return (
        <>
            <Header />
            <Tags />
            <Carousel/>
            <Channel/>
            <Featured/>
            <Shows/>
            <Shows/>
            <Shows/>
           
        </>
    )
}
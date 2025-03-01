import Header from "../components/header/Header";
import Channel from '../components/channels/Channel'
import Tags from "../components/tags/Tags"
import Carousel from "../components/carousel/Carousel";
import Featured from "../components/featured/Featured";

import Shows from "../components/shows/Shows";
import { useEffect, useState } from "react";
export default function Home() {

    let [movies, setMovies] = useState([])
    let [featuredMovies, setFeaturedMovies] = useState([]);
    let [dramaMovies, setDramaMovies] = useState([]);
    let [hindiMovies, setHindiMovies] = useState([]);

    let [topMovies, setTopMovies] = useState([]);
    let [japaneseMovies, setJapaneseMovies] = useState([]);
    useEffect(() => {

        const fetchMovies = async () => {
            try {
                let movieResponse = await fetch("http://localhost:3000/movies")

                let moviesData = await movieResponse.json();

                setMovies(moviesData);

                // fileter for feautred movies

                let featMovies = moviesData.filter((movie) => { return movie.featured === true })
                setFeaturedMovies(featMovies.slice(0, 4))

                console.log("featured movie data", featMovies)
                let draMovies = moviesData.filter((movie) => movie.genre.includes("Drama"));
let slicedDramaMovies = draMovies.slice(0, 6);

console.log("Drama Movies (sliced):", slicedDramaMovies); // Log after slicing
setDramaMovies(slicedDramaMovies);
                // hindi movies

                const hindiMovies = moviesData.filter(movie => movie.language === "Hindi").slice(0, 6);

                setHindiMovies(hindiMovies)
                //topRated movies

                const topRateMovies = moviesData.filter(movie => movie.imdb >= 8.5).slice(0, 6);
                setTopMovies(topRateMovies)
                //japnanes movies
                const japanMovies = moviesData.filter(movie => movie.country === "Japan").slice(0, 6)
                setJapaneseMovies(japanMovies);
                console.log(" all movies data in home", moviesData)

            } catch (err) {
                console.log("Error in fetching  movie", err)
            }



        }
        fetchMovies()
    }, [])


    return (
        <>
            <Header movies = {movies} />
            <Tags />
            <Carousel />
            <Channel />
            <Featured movies={featuredMovies} />
            <Shows title="Drama Movies" movies={dramaMovies} />
            <Shows title="Bollywood Movies" movies={hindiMovies} />
            <Shows title="Highly Rated Movies" movies={topMovies} />

        </>
    )
}
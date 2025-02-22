import Search from "./components/Search.jsx";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import {getTrendingMovies, updateSearchCount} from "./appwrite.js";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`
    }
}

const App = () => {
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [searchTerm, setSearchTerm] = useState("")

    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const [trendingMovies, setTrendingMovies] = useState([])
    const [isLoadingTrending, setIsLoadingTrending] = useState(false)
    const [errorTrendingMessage, setErrorTrendingMessage] = useState("");

    // we don't want to overload the API so we can debounce the search term
    // to prevent making too many calls (should prevent 'too many requests' error)
    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

    const fetchMovies = async (query = "") => {

        setIsLoading(true)
        setIsLoadingTrending(true)
        setErrorTrendingMessage("")
        setErrorMessage("")

        try {
            const endpoint = query
                ? `${API_BASE_URL}/search/movie?query=${encodeURI(query)}`
                : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

            const response = await fetch(endpoint, API_OPTIONS);
            if (!response.ok) {
                throw new Error("Failed to fetch movies");
            }

            const data = await response.json();
            if (data.Response === "False"){
                setErrorMessage(data.Error || "Failed to fetch movies");
                // clear movie list
                setMovies([])
                return
            }

            // show movies
            setMovies(data.results || [])

            // log search for 'trending' feature
            if (query && data.results.length > 0){
                await updateSearchCount(query, data.results[0]);
            }

        } catch (error){
            console.log(`Error fetching movies: ${error}`)
            setErrorMessage("Error fetching movies. Please try again later.")
        } finally {
            setIsLoading(false)
            setIsLoadingTrending(false)
        }
    }

    const loadTrendingMovies = async () => {
        try {

            const movies = await getTrendingMovies();
            setTrendingMovies(movies);

        } catch (e) {
            console.log(`Error fetching trending movies: ${e}`);
            setErrorMessage("Error fetching trending movies");
        }
    }

    // this will run every time the user searches for a movie (using debounce)
    useEffect(() => {
        fetchMovies(debouncedSearchTerm)
    },[debouncedSearchTerm])

    // load the trending movies on start (top 5)
    useEffect(() => {
        loadTrendingMovies();
    },[])

    return (
        <main>
            <div className={"pattern"}/>
            <div className={"wrapper"}>
                <header>
                    <div className={"content-center"}><img className={"size-16"} src={"./logo.png"} alt={"Logo"}/></div>
                    <img src={"./hero.png"} alt={"Hero Banner"}/>
                    <h1>Find <span className={"text-gradient"}>Movies</span> You'll Enjoy Without the Hassle</h1>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </header>

                {/* Trending Movies */}
                <section className={"trending"}>
                    <h2>Trending Movies</h2>

                    {isLoadingTrending ? (
                        //we're loading trending searches
                        <Spinner />
                    ): errorTrendingMessage ? (
                        // error loading trending
                        <p className={"text-red-500"}>{errorTrendingMessage}</p>
                    ) : (
                        // show trending searches
                        <ul>
                            {trendingMovies.map((movie, index) => (
                                <li key={movie.$id}>
                                    <p>{index + 1}</p>
                                    <img src={movie.poster_url} alt={movie.title}/>
                                </li>
                            ))}
                        </ul>
                    )}

                </section>

                {/* All Movies */}
                <section className={"all-movies"}>
                    <h2>All Movies</h2>

                    {isLoading ? (
                        // we're loading
                        <Spinner />
                    ) : errorMessage ? (
                        // there was an error
                        <p className={"text-red-500"}>{errorMessage}</p>
                    ) : (
                        // show movies
                        <ul>
                            {movies.map(movie => (
                                <MovieCard key={movie.id} movie={movie}/>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </main>
    );
};

export default App;
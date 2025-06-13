import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utiles/constants";
import { addNowPlayingMovies } from "../utiles/movieslice";


const useNowPlaying = () =>{
    const dispatch = useDispatch();
    const nowPlayingMovies = async () =>{
     const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
     const json = await data.json();  
     dispatch(addNowPlayingMovies(json.results));
    }
  
    useEffect(() => {
      nowPlayingMovies();
    }, []);
};

export default useNowPlaying;
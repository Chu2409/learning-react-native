import { movieApi } from "@/core/api/movie-api";
import { MovieDBResponse } from "@/infrastructure/interfaces/moviedb.response";
import { MovieMapper } from "@/infrastructure/mappers/movie.mapper";

export const popularMoviesAction = async () => {
  try {
    const {data} = await movieApi.get<MovieDBResponse>('/popular')
    
    return data.results.map(MovieMapper.fromTheMovieDBtoMovie)
  } catch (error) {
    console.log(error);
    throw 'Cannot load now playing movies'
  }
}
import { movieApi } from "@/core/api/movie-api";
import { MovieDBResponse } from "@/infrastructure/interfaces/moviedb.response";
import { MovieMapper } from "@/infrastructure/mappers/movie.mapper";

export const nowPlayingAction = async () => {
  try {
    const {data} = await movieApi.get<MovieDBResponse>('/now_playing')
    
    return data.results.map(MovieMapper.fromTheMovieDBtoMovie)
  } catch (error) {
    console.log(error);
    throw 'Cannot load now playing movies'
  }
}
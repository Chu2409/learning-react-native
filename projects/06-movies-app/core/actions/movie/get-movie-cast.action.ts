import { movieApi } from "@/core/api/movie-api";
import { Cast } from "@/infrastructure/interfaces/cast.interfacae";
import { CreditsResponse } from "@/infrastructure/interfaces/credits-response.interface";
import { CompleteMovie } from "@/infrastructure/interfaces/movie.interface";
import { MovieDBMovieResponse } from "@/infrastructure/interfaces/moviedb-movie.response";
import { CastMapper } from "@/infrastructure/mappers/cast.mapper";
import { MovieMapper } from "@/infrastructure/mappers/movie.mapper";

export const getMovieCastAction = async (movieId: number | string): Promise<Cast[]> => {
  try {
    const { data } = await movieApi.get<CreditsResponse>(`/${movieId}/credits`);


      return data.cast.map((cast) => CastMapper.fromMovieDBCastToEntity(cast));
    } catch (error) {
      console.log(error);
      throw 'Cannot load now playing movies'
    }
}
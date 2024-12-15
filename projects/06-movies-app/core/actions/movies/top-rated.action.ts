import { movieApi } from "@/core/api/movie-api";
import { MovieDBResponse } from "@/infrastructure/interfaces/moviedb.response";
import { MovieMapper } from "@/infrastructure/mappers/movie.mapper";

interface Options {
  page?: number;
  limit?: number;
}

export const topRatedMoviesAction = async ({
  limit = 10,
  page = 1,
}: Options) => {
  try {
    const { data } = await movieApi.get<MovieDBResponse>("/top_rated", {
      params: {
        page,
      },
    });

    return data.results.map(MovieMapper.fromTheMovieDBtoMovie);
  } catch (error) {
    console.log(error);
    throw "Cannot load now playing movies";
  }
};

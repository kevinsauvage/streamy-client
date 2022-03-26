const API_KEY = process.env.REACT_APP_TMDB_KEY;

const requests = {
  Home: {
    Trending: {
      title: "Trending",
      url: `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US&include_adult=false`,
    },
    PopularMovies: {
      title: "Popular Movies",
      url: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&include_adult=false`,
      type: "movie",
    },

    PopularTvShow: {
      title: "Popular Tv Show",
      url: `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&include_adult=false`,
      type: "show",
    },
    TopRatedMovies: {
      title: "Top Rated Movies",
      url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&include_adult=false`,
      type: "movie",
    },
    TopRatedTvShow: {
      title: "Top Rated Tv Show",
      url: `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&include_adult=false`,
      type: "show",
    },
    nowPlayingMovies: {
      title: "Movies Playing Now",
      url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&include_adult=false`,
      type: "movie",
    },
  },

  movies: {
    ActionMovies: {
      title: "Action",
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28&language=en-US&include_adult=false`,
      type: "Movie",
    },
    ComedyMovies: {
      title: "Comedy",
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35&language=en-&include_adult=false`,
      type: "Movie",
    },
    Fantasy: {
      title: "Fantasy",
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=14&language=en-US&include_adult=false`,
      type: "Movie",
    },
    MysteryMovies: {
      title: "Mystery",
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=9648&language=en-US&include_adult=false`,
      type: "Movie",
    },
    DramaMovies: {
      title: "Drama",
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=18&language=en-US&include_adult=false`,
      type: "Movie",
    },
    ScienceFictionMovies: {
      title: "Science Fiction",
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=878&language=en-US&include_adult=false`,
      type: "Movie",
    },
    ThrillerMovies: {
      title: "Thriller",
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=53&language=en-US&include_adult=false`,
      type: "Movie",
    },
    Documentary: {
      title: "Documentary",
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=99&language=en-US&include_adult=false`,
      type: "Movie",
    },
    Adventure: {
      title: "Adventure",
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=12&language=en-US&include_adult=false`,
      type: "Movie",
    },
    Family: {
      title: "Family",
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10751&language=en-US&include_adult=false`,
      type: "Movie",
    },
    HorrorMovies: {
      title: "Horror",
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27&language=en-US&include_adult=false`,
      type: "Movie",
    },
    RomanceMovies: {
      title: "Romance",
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749&language=en-US&include_adult=false`,
      type: "Movie",
    },
    History: {
      title: "History",
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=36&language=en-US&include_adult=false`,
      type: "Movie",
    },
    Music: {
      title: "Music",
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10402&language=en-US&include_adult=false`,
      type: "Movie",
    },
    TvMovie: {
      title: "TV Movie",
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10770&language=en-US&include_adult=false`,
      type: "Movie",
    },
    WesternMovies: {
      title: "Western",
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=37&language=en-US&include_adult=false`,
      type: "Movie",
    },
  },

  series: {
    ActionTvShow: {
      title: "Action & Adventure",
      url: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=10759&language=en-US&include_adult=false`,
    },
    crime: {
      title: "Thriller",
      url: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=80&language=en-US&include_adult=false`,
    },
    ComedyTvShow: {
      title: "Comedy",
      url: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=35&language=en-US&include_adult=false`,
    },
    Fantasy: {
      title: "Sci-Fi & Fantasy",
      url: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=10765&language=en-US&include_adult=false`,
    },
    MysteryTvShow: {
      title: "Mystery",
      url: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=9648&language=en-US&include_adult=false`,
    },
    animation: {
      title: "Animation",
      url: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16&language=en-US&include_adult=false`,
    },
    DramaTvShow: {
      title: "Drama",
      url: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=18&language=en-US&include_adult=false`,
    },
    Documentary: {
      title: "Documentary",
      url: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=99&language=en-US&include_adult=false`,
    },
    Reality: {
      title: "Reality",
      url: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=10764&language=en-US&include_adult=false`,
    },
    Family: {
      title: "Family",
      url: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=10751&language=en-US&include_adult=false`,
    },
    WesternTvShow: {
      title: "Western",
      url: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=37&language=en-US&include_adult=false`,
    },
  },

  getUpcoming: {
    title: "Upcoming",
    url: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&include_adult=false`,
  },
  getTrendingMovies: {
    title: "Trending Movies This Week",
    url: `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US&include_adult=false`,
  },
  getTrendingTvShow: {
    title: "Trending Show This Week",
    url: `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}&language=en-US&include_adult=false`,
  },

  getMovieById: {
    url: `https://api.themoviedb.org/3/movie/{id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits`,
  },
  getShowById: {
    url: `https://api.themoviedb.org/3/tv/{id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits`,
  },

  getSimilarMovie: {
    url: `https://api.themoviedb.org/3/movie/{id}/similar?api_key=${API_KEY}&language=en-US&include_adult=false`,
  },
  getSimilarShow: {
    url: `https://api.themoviedb.org/3/tv/{id}/similar?api_key=${API_KEY}&language=en-US&include_adult=false`,
  },
  getRecommendationMovie: {
    url: `https://api.themoviedb.org/3/movie/{id}/recommendations?api_key=${API_KEY}&language=en-US&include_adult=false`,
  },
  getRecommendationShow: {
    url: `https://api.themoviedb.org/3/tv/{id}/recommendations?api_key=${API_KEY}&language=en-US&include_adult=false`,
  },
  getMoviesGenre: {
    url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US&include_adult=false`,
  },
  getSeriesGenre: {
    url: `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US&include_adult=false`,
  },
  getFilters: {
    url: `https://api.themoviedb.org/3/discover/{type}?api_key=${API_KEY}&language=en-US&include_adult=false&primary_release_date.lte=${Date.now()}&with_original_language=en`,
  },
  searchMulti: {
    url: `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&include_adult=false`,
  },

  getLanguages: {
    url: `https://api.themoviedb.org/3/configuration/languages?api_key=${API_KEY}`,
  },
};

export const image = {
  url: {
    original: "https://image.tmdb.org/t/p/original/",
    w185: "http://image.tmdb.org/t/p/w185/",
    w342: "http://image.tmdb.org/t/p/w342/",
    w500: "http://image.tmdb.org/t/p/w500/",
    w300: "http://image.tmdb.org/t/p/w300/",
    w700: "http://image.tmdb.org/t/p/w700/",
    w1000: "http://image.tmdb.org/t/p/w1000/",
    w1920: "http://image.tmdb.org/t/p/w1920/",
    w780: "http://image.tmdb.org/t/p/w780/",
    w1280: "http://image.tmdb.org/t/p/w1280/",
  },
};

export default requests;

import { useCallback, useEffect, useState } from "react";
import { range } from "../data/range";
import apiHelper from "../helpers/apiHelper";
import requests from "../helpers/requests";

const useFilter = (isBottom) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("Movie");
  const [genres, setGenres] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState("");
  const [selectedSorting, setSelectedSorting] = useState({
    name: "Popularity desc",
    value: "popularity.desc",
  });

  const [years] = useState(() => {
    return range(1950, new Date().getFullYear(), 1).map((item) => {
      return { name: `${item}` };
    });
  });

  const fetchData = useCallback(async () => {
    if (!type || !page) return;
    const url = requests.getFilters.url.replace("{type}", type.split("-")[0].toLowerCase());

    const data = await apiHelper(
      `${url}&page=${page}&vote_average.gte=${
        selectedRatings ? selectedRatings.value : ""
      }&with_genres=${selectedGenres.map((item) => item.id)}&primary_release_year=${
        selectedYears.length > 0 ? selectedYears?.map((item) => item.name) : ""
      }&sort_by=${selectedSorting?.value ? selectedSorting.value : ""}&first_air_date_year=${
        selectedYears.length > 0 ? selectedYears?.map((item) => item.name) : ""
      }`,
      null,
      "get"
    );

    return data.results;
  }, [type, selectedGenres, selectedRatings, selectedSorting, selectedYears, page]);

  const handleGetMore = async () => {
    const data = await fetchData();
    const newItems = [...movies, ...data];
    const uniq = [...new Set(newItems)];
    uniq && setMovies(uniq);
  };

  const handleGetNew = async () => {
    setPage(1);
    setMovies([]);
    const data = await fetchData();
    setMovies(data);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => page !== 1 && handleGetMore(), [page]);

  useEffect(() => isBottom && setPage((prev) => prev + 1), [isBottom]);

  useEffect(() => {
    handleGetNew();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGenres, selectedRatings, selectedSorting, selectedYears]);

  useEffect(() => {
    resetForm();
    handleGetNew();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    if (type === "Movie") {
      apiHelper(requests.getMoviesGenre.url, null, "get", null, "get").then((data) =>
        setGenres(data.genres)
      );
    }
    if (type === "Tv-series") {
      apiHelper(requests.getSeriesGenre.url, null, "get", null, "get").then((data) =>
        setGenres(data.genres)
      );
    }
  }, [type]);

  const handleUpdateGenres = (genre) => {
    if (selectedGenres.includes(genre)) {
      const newArr = selectedGenres.filter((item) => item !== genre);
      setSelectedGenres(newArr);
    } else setSelectedGenres([...selectedGenres, genre]);
  };

  const handleUpdateYears = (year) => {
    if (type === "Tv-series") {
      return setSelectedYears([year]);
    }
    if (selectedYears.includes(year)) {
      const newArr = selectedYears.filter((item) => item !== year);
      setSelectedYears(newArr);
    } else setSelectedYears([...selectedYears, year]);
  };

  const resetForm = () => {
    setSelectedGenres([]);
    setSelectedYears([]);
    setSelectedRatings("");
    setSelectedSorting({ name: "Popularity desc", value: "popularity.desc" });
  };

  return {
    type,
    selectedGenres,
    selectedRatings,
    selectedSorting,
    selectedYears,
    years,
    setSelectedRatings,
    setSelectedSorting,
    setType,
    handleUpdateYears,
    handleUpdateGenres,
    genres,
    resetForm,
    movies,
  };
};

export default useFilter;

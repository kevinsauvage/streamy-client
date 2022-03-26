import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import MediumMovieCard from "../../components/MediumMovieCard/MediumMovieCard";
import apiHelper from "../../helpers/apiHelper";
import requests from "../../helpers/requests";
import useIsBottom from "../../hooks/useIsBottom";
import Container from "../../layouts/Container/Container";
import Grid from "../../layouts/Grid/Grid";
import "./Search.scss";

const Search = () => {
  const [items, setItems] = useState([]);
  const searchPage = useRef(null);
  const isBottom = useIsBottom(searchPage);
  const [page, setPage] = useState(1);
  const location = useLocation();
  const [query, setQuery] = useState("");

  const fetchData = useCallback(async () => {
    if (!query) return;
    const data = await apiHelper(
      requests.searchMulti.url + `&query=${query}&page=${page}`,
      null,
      "get"
    );
    if (!data.results) return [];
    const filteredData = data.results.filter(
      (item) => item.media_type === "movie" || item.media_type === "tv"
    );
    return filteredData;
  }, [page, query]);

  const handleGetMore = async () => {
    const data = await fetchData();
    const newItems = [...items, ...data];
    const uniq = [...new Set(newItems)];
    uniq && setItems(uniq);
  };

  useEffect(() => setQuery(location.pathname.split("/").pop()), [location]);

  const handleGetNew = async () => {
    const data = await fetchData();
    setItems(data);
  };

  useEffect(() => {
    setPage(1);
    handleGetNew();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => page !== 1 && handleGetMore(), [page]);

  useEffect(() => isBottom && setPage((prev) => prev + 1), [isBottom]);

  return (
    <div className="Search">
      <Container>
        <Grid>
          {items?.length > 0 &&
            items.map((item, i) => <MediumMovieCard key={item.id + i} movie={item} />)}
        </Grid>
      </Container>
    </div>
  );
};

export default Search;

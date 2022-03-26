import { useEffect, useState } from "react";
import SLide from "../../components/Slide/Slide";
import requests from "../../helpers/requests";
import CarouselWrapper from "../../components/CarouselWrapper/CarouselWrapper";
import Acordeon from "../../components/Acordeon/Acordeon";
import Page from "../../layouts/Page/Page";
import Container from "../../layouts/Container/Container";
import apiHelper from "../../helpers/apiHelper";

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    apiHelper(requests.Home.Trending.url, null, "get", null, "get").then((data) =>
      setTrendingMovies(data.results)
    );
  }, []);

  return (
    <Page>
      <SLide items={trendingMovies} />
      <Acordeon url={requests.getUpcoming.url} title={requests.getUpcoming.title} type={"movie"} />
      <Container>
        {requests &&
          Object.values(requests.Home).map((item) => (
            <CarouselWrapper url={item.url} title={item.title} type={item.type} key={item.url} />
          ))}
      </Container>
    </Page>
  );
};

export default Home;

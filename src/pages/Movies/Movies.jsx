import { useEffect } from "react";
import Acordeon from "../../components/Acordeon/Acordeon";
import CarouselWrapper from "../../components/CarouselWrapper/CarouselWrapper";
import requests from "../../helpers/requests";
import Container from "../../layouts/Container/Container";
import Page from "../../layouts/Page/Page";

const Movies = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <Page>
      <Acordeon
        url={requests.getTrendingMovies.url}
        title={requests.getTrendingMovies.title}
        type={"movie"}
      />
      <Container>
        {requests &&
          Object.values(requests.movies).map((item) => (
            <CarouselWrapper url={item.url} title={item.title} type={"movie"} key={item.url} />
          ))}
      </Container>
    </Page>
  );
};

export default Movies;

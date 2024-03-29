import BannerSlider from '../../components/BannerSlider/BannerSlider';
import CarouselWrapper from '../../components/CarouselWrapper/CarouselWrapper';
import Container from '../../components/Container/Container';
import requests from '../../helpers/requests';
import Page from '../../layouts/Page/Page';

const Movies = () => (
  <Page>
    <BannerSlider url={requests.getTrendingMovies.url} />
    <Container>
      {Object.values(requests.movies).map((item) => (
        <CarouselWrapper url={item.url} title={item.title} type="movie" key={item.url} />
      ))}
    </Container>
  </Page>
);

export default Movies;

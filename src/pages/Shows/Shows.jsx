import Acordeon from "../../components/Acordeon/Acordeon";
import requests from "../../helpers/requests";
import CarouselWrapper from "../../components/CarouselWrapper/CarouselWrapper";
import Page from "../../layouts/Page/Page";
import Container from "../../layouts/Container/Container";

const Shows = () => {
  return (
    <Page>
      <Acordeon url={requests.getTrendingTvShow.url} title={requests.getTrendingTvShow.title} type="show" />
      <Container>
        {requests &&
          Object.values(requests.series).map((item) => (
            <CarouselWrapper url={item.url} title={item.title} type={"show"} key={item.url} />
          ))}
      </Container>
    </Page>
  );
};

export default Shows;

import { useContext } from "react";
import "./List.scss";
import MediumMovieCard from "../../components/MediumMovieCard/MediumMovieCard";
import Title from "../../components/Title/Title";
import Container from "../../layouts/Container/Container";
import Grid from "../../layouts/Grid/Grid";
import Page from "../../layouts/Page/Page";
import { UserContext } from "../../context/UserContext";

const List = () => {
  const { userMovies } = useContext(UserContext);

  return (
    <Page className="List">
      <Container>
        <Title title={"MY LIST"} />
        <Grid>
          {userMovies.length ? (
            userMovies.map((item, i) => (
              <MediumMovieCard key={i} movie={item.movie} type={item.type} />
            ))
          ) : (
            <p>Nothing to show yet.</p>
          )}
        </Grid>
      </Container>
    </Page>
  );
};

export default List;

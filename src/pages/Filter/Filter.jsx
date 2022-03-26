import "./Filter.scss";
import Page from "../../layouts/Page/Page";
import Container from "../../layouts/Container/Container";
import Title from "../../components/Title/Title";
import { useRef } from "react";
import MediumMovieCard from "../../components/MediumMovieCard/MediumMovieCard";
import useIsBottom from "../../hooks/useIsBottom";
import FilterBox from "../../components/FilterBox/FilterBox";
import { BiMoviePlay } from "react-icons/bi";
import { RiFilter2Fill } from "react-icons/ri";
import { ratings } from "../../data/rating";
import { sorting } from "../../data/sorting";
import { AiFillFolderOpen } from "react-icons/ai";
import { CgArrowTopRightR } from "react-icons/cg";
import { FaRegCalendarAlt, FaSortAmountUp } from "react-icons/fa";
import Grid from "../../layouts/Grid/Grid";
import useFilter from "../../hooks/useFilter";

const Filter = () => {
  const filterPage = useRef(null);
  const isBottom = useIsBottom(filterPage);

  // infinite scroll handling, trigger fetchData function

  const {
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
  } = useFilter(isBottom);

  return (
    <div className="Filter" ref={filterPage}>
      <Page>
        <Container>
          <Title title={"FILTER"} />

          <div className="Filter__filters">
            <FilterBox
              items={[{ name: "Movie" }, { name: "Tv-series" }]}
              handleUpdateItems={(type) => setType(type.name)}
              icon={<BiMoviePlay />}
              label="Type"
              checkedFunction={(item) => type === item.name}
            />
            <FilterBox
              items={years}
              handleUpdateItems={(item) => handleUpdateYears(item)}
              icon={<FaRegCalendarAlt />}
              label="Year"
              grid={true}
              column={window.innerWidth < 600 ? 4 : 6}
              checkedFunction={(item) => selectedYears.includes(item)}
            />
            <FilterBox
              items={ratings}
              handleUpdateItems={(item) => setSelectedRatings(item)}
              icon={<CgArrowTopRightR />}
              label="Rating"
              checkedFunction={(item) => item === selectedRatings}
            />
            <FilterBox
              items={genres}
              handleUpdateItems={handleUpdateGenres}
              icon={<AiFillFolderOpen />}
              label="Genre"
              grid={true}
              column={window.innerWidth < 600 ? 2 : window.innerWidth < 800 ? 2 : 3}
              checkedFunction={(item) => selectedGenres.includes(item)}
            />
            <FilterBox
              items={sorting}
              handleUpdateItems={(item) => setSelectedSorting(item)}
              icon={<FaSortAmountUp />}
              label="Sorting"
              checkedFunction={(item) => item === selectedSorting}
            />
            <div className="Filter__btn" onClick={resetForm}>
              <RiFilter2Fill /> <p>Reset</p>
            </div>
          </div>
          <Grid>
            {movies.length > 0 &&
              movies.map((movie) => (
                <MediumMovieCard key={movie.id} movie={movie} type={type.split("-")[0].toLowerCase()} />
              ))}
          </Grid>
        </Container>
      </Page>
    </div>
  );
};

export default Filter;

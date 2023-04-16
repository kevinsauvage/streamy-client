import { AiFillFolderOpen } from 'react-icons/ai';
import { BiMoviePlay } from 'react-icons/bi';
import { CgArrowTopRightR } from 'react-icons/cg';
import { FaRegCalendarAlt, FaSortAmountUp } from 'react-icons/fa';
import { RiFilter2Fill } from 'react-icons/ri';

import Container from '../../components/Container/Container';
import FilterBox from '../../components/FilterBox/FilterBox';
import Grid from '../../components/Grid/Grid';
import MediumMovieCard from '../../components/MediumMovieCard/MediumMovieCard';
import Title from '../../components/Title/Title';
import ratings from '../../data/rating';
import sorting from '../../data/sorting';
import useFilter from '../../hooks/useFilter';
import useIsBottom from '../../hooks/useIsBottom';
import Page from '../../layouts/Page/Page';

import './Filter.scss';

const Filter = () => {
  const isBottom = useIsBottom();

  const { resetForm, movies, handleFilterClick, years, checkQueryParameters, genres, type } =
    useFilter(isBottom);

  const { innerWidth } = window;

  return (
    <Page>
      <div className="Filter">
        <Container>
          <Title title="FILTER" />
          <div className="Filter__filters">
            <FilterBox
              items={[{ name: 'Movie' }, { name: 'Tv-series' }]}
              handleUpdateItems={(item) => {
                resetForm({ page: '1', sorting: 'popularity.desc', type: item.name });
              }}
              icon={<BiMoviePlay />}
              label="Type"
              checkedFunction={(item) => checkQueryParameters({ type: item.name })}
            />
            <FilterBox
              items={years}
              handleUpdateItems={(item) => handleFilterClick({ years: item.name })}
              icon={<FaRegCalendarAlt />}
              label="Year"
              grid
              column={innerWidth < 600 ? 4 : 6}
              checkedFunction={(item) => checkQueryParameters({ years: item.name })}
            />
            <FilterBox
              items={ratings}
              handleUpdateItems={(item) => handleFilterClick({ ratings: item.value })}
              icon={<CgArrowTopRightR />}
              label="Rating"
              checkedFunction={(item) => checkQueryParameters({ ratings: item.value })}
            />
            <FilterBox
              items={genres}
              handleUpdateItems={(item) => handleFilterClick({ genres: item.id })}
              icon={<AiFillFolderOpen />}
              label="Genre"
              grid
              column={innerWidth < 800 ? 2 : 3}
              checkedFunction={(item) => checkQueryParameters({ genres: item.id })}
            />
            <FilterBox
              items={sorting}
              handleUpdateItems={(item) => handleFilterClick({ sorting: item.value })}
              icon={<FaSortAmountUp />}
              label="Sorting"
              checkedFunction={(item) => checkQueryParameters({ sorting: item.value })}
            />
            <button type="button" className="Filter__btn" onClick={() => resetForm()}>
              <RiFilter2Fill /> <p>Reset</p>
            </button>
          </div>
          <Grid>
            {movies.length > 0 &&
              movies.map((movie) => (
                <MediumMovieCard
                  key={movie.id}
                  movie={movie}
                  type={type?.split('-')[0].toLowerCase()}
                />
              ))}
          </Grid>
        </Container>
      </div>
    </Page>
  );
};

export default Filter;
import Wrapper from '../../layouts/Wrapper/Wrapper'
import './CreditBox.scss'

const CreditBox = ({ credits }) => {
  const getProductor = (crew, num) => {
    const items = crew.filter(
      (item) => item.known_for_department === 'Production',
    )

    const shorterItems = items.splice(0, num)

    return shorterItems.map((item, i) => {
      if (i === shorterItems.length - 1 && items.length < shorterItems.length)
        return item.name + '.'
      if (i === shorterItems.length - 1 && items.length > shorterItems.length)
        return item.name + '...'
      else return item.name + ', '
    })
  }

  const getActors = (cast, num) => {
    const actors = Object.values(
      Object.fromEntries(Object.entries(cast).sort((a, b) => a[1] - b[1])),
    )

    const shorterActors = actors.splice(0, num)

    return shorterActors.map((item, i) => {
      if (
        i === shorterActors.length - 1 &&
        actors.length < shorterActors.length
      )
        return item.name + '.'
      if (
        i === shorterActors.length - 1 &&
        actors.length > shorterActors.length
      )
        return item.name + '...'
      else return item.name + ', '
    })
  }

  return (
    <div className="CreditBox">
      <Wrapper
        style={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
      >
        <div className="CreditBox__director">
          <h6 className="CreditBox__title">Productor</h6>
          <p className="CreditBox__names">
            {credits?.crew && getProductor(credits.crew, 10)}
          </p>
        </div>
        <div className="CreditBox__cast">
          <h6 className="CreditBox__title">Cast</h6>
          <p className="CreditBox__names">
            {credits?.cast && getActors(credits?.cast, 10)}
          </p>
        </div>
      </Wrapper>
    </div>
  )
}

export default CreditBox

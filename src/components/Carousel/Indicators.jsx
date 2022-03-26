import "./Indicators.scss";

const Indicators = ({ childrensCount, itemsShow, page, updateActive }) => {
  return (
    <div className="indicators">
      {Array(Math.ceil(childrensCount / itemsShow))
        .fill(null)
        .map((u, i) => (
          <div
            key={i}
            onClick={() => updateActive(i)}
            className={
              i === page ? "indicators__outer indicators__outer--active" : "indicators__outer"
            }></div>
        ))}
    </div>
  );
};

export default Indicators;

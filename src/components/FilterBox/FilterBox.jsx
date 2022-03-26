import { useRef, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import "./FilterBox.scss";

const FilterBox = ({ items, handleUpdateItems, label, icon, checkedFunction, grid, column }) => {
  const [open, setOpen] = useState(false);

  const box = useRef(null);

  const inputRef = useRef(null);

  useClickOutside(box, () => setOpen(false));

  return (
    <div className="FilterBox" ref={box}>
      <div
        ref={inputRef}
        className={`FilterBox__visible ${open && "FilterBox__visible--open"}`}
        onClick={() => setOpen(!open)}>
        {icon} <p className="FilterBox__label">{label}</p>
      </div>
      {open && (
        <div className="FilterBox__dropBox">
          <ul
            className="FilterBox__list"
            style={{
              display: grid ? "grid" : null,
              gridTemplateColumns: `repeat(${column}, 1fr )`,
            }}>
            {items?.length > 0 &&
              items.map((item, i) => (
                <li key={i} className="FilterBox__listItem" onClick={() => handleUpdateItems(item)}>
                  <input readOnly type="checkbox" checked={checkedFunction(item)} />
                  {item.name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterBox;

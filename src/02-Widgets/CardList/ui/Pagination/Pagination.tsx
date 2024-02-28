import { FC } from "react";

import "./style.css";

type typeProps = {
  offset: number;
  setOffset: Function;
};

export const Pagination: FC<typeProps> = ({ offset, setOffset }) => {
  return (
    <div className="pagination">
      {offset !== 0 && (
        <button
          onClick={() => {
            setOffset(offset - 50);
          }}>
          {"<"}
        </button>
      )}
      <button
        onClick={() => {
          setOffset(offset + 50);
        }}>
        {">"}
      </button>
    </div>
  );
};

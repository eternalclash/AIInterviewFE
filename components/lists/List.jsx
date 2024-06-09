import { GetServerSideProps } from "next";
import { FaFolder, FaFile, FaList } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
const List = ({ list, onSelect }) => {
  return (
    <div>
      {list?.map((item, idx) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "0.9rem",
            height: "4vh",
            cursor: "pointer",
          }}
          onClick={() => onSelect(item)}
          key={idx}
        >
          <div
            style={{
              width: "10%",

              marginRight: "0.5vw",
            }}
          >
            <FaList size="1.2em" />
          </div>
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "100%",
            }}
          >
            {item.question}
          </div>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default List;

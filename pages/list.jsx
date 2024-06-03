import { GetServerSideProps } from "next";

const list = () => {
  return <div>Enter</div>;
};

export const getServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default list;

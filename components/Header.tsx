import { GetServerSideProps } from "next";
import styles from "@/styles/header.module.css";
const Header = () => {
  return <div className={styles.header}>로그인</div>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default Header;

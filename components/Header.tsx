import { GetServerSideProps } from "next";
import styles from "@/styles/header.module.css";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  return (
    <div
      className={styles.header}
      onClick={() => router.push("/login")}
      style={{ cursor: "pointer", padding: "1.5%" }}
    >
      로그인
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default Header;

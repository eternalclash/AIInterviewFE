import useUserStore from "@/store/user";
import { GetServerSideProps } from "next";

const Signup = () => {
  const {
    name,
    password,
    errorObj,
    nameHandler,
    passwordHandler,
    signupHandler,
    navigateMain,
  } = useUserStore();

  return (
    <main className="w-full bg-yellow-light h-screen m-0 p-0 flex justify-center items-center">
      <div className="flex shadow-3xl border-solid border-2 bg-yellow-dark w-80 h-60 rounded-2xl flex-col justify-around items-center">
        <div className="w-full mx-4">
          <div className="w-full mb-2 text-center font-bold">회원가입</div>
          <div className="flex w-full border-solid"></div>
        </div>
        {errorObj && <div>{errorObj?.errorMessage}</div>}
        <div className="flex w-11/12 justify-center mx-4 h-8 rounded bg-white ">
          <input
            className="w-full pl-2 pd bg-transparent border-none"
            value={name}
            type="text"
            onChange={nameHandler}
            placeholder="아이디를 생성해주세요."
          />
        </div>
        <div className="flex w-11/12 justify-center w-100 mx-4 h-8 rounded bg-white">
          <input
            type="password"
            value={password}
            onChange={passwordHandler}
            className="w-full pl-2 bg-transparent border-none"
            placeholder="비밀번호를 생성해주세요."
          />
        </div>
        <div className="flex w-11/12 h-8 mx-4 justify-around">
          <div
            onClick={signupHandler}
            className="hover:cursor-pointer hover:w-40 border-solid bg-aqua-dark shadow-xx w-20 rounded flex justify-center items-center text-sm  "
          >
            확인
          </div>
          <div
            onClick={navigateMain}
            className=" hover:cursor-pointer hover:w-40 border-solid bg-peach-dark shadow-xx w-20 rounded flex justify-center items-center text-sm "
          >
            취소
          </div>
        </div>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default Signup;

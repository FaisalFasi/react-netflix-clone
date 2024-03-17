import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 ">
      <div className="">
        <img
          src="/src/assets/vecteezy_netflix-logo.jpg"
          alt="logo"
          className="h-12 bg-transparent"
        />
      </div>
      <button
        onClick={() => navigate(props.login ? "/login" : "/signup")}
        className=" cursor-pointer bg-red-600 text-white text-sm font-semibold border-none rounded px-4 py-2 md:my-4      "
      >
        {props.login ? "Log In" : "Sign Up"}
      </button>
    </div>
  );
}

import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../utilities/firebase-configs";
import { useState } from "react";
import Header from "../components/Header";
import BackgroundImage from "../components/BackgroundImage";

import { useNavigate } from "react-router-dom";
export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(false);

  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isEmailValid) {
      setShowPassword(true);

      // navigate("/login");
    } else {
      alert("Please enter a valid email");
    }
  };

  const handleEmailChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsEmailValid(emailRegex.test(value));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("handleSignUp called"); // Add this line
    try {
      const { email, password } = formValues;

      if (password.length > 5) {
        await createUserWithEmailAndPassword(firebaseAuth, email, password);

        navigate("/login");
        console.log("sign up complete");
      } else {
        alert("Please enter password atleast 6 character long");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className=" min-h-screen relative">
      <BackgroundImage />
      <div className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-60">
        <Header login />
        <div className="flex flex-col gap-4  pt-10 sm:pt-[20%] md:pt-[12%] mx-8 md:mx-20 justify-center items-center text-center text-white">
          <h1 className="text-2xl md:text-2xl lg:text-4xl font-extrabold">
            Unlimited movies, TV shows and more
          </h1>
          <p className=" text-md md:text-lg font-normal">
            Watch anywhere. Cancel anytime.
          </p>
          <p className="mt-2 text-sm md:text-md font-normal">
            Ready to watch? Enter your email to create or restart membership
          </p>
        </div>
        <form onSubmit={handleSignUp} method="post">
          <div className="w-full flex flex-col md:flex-row items-center justify-center  gap-2 mt-8 px-8 text-black">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              className="w-[80%] md:w-[50%] emailInput  border border-black rounded px-2 py-4 "
              value={formValues.email}
              onChange={handleEmailChange}
              required
            />
            {showPassword ? (
              <div className="w-[80%] md:w-[50%] flex flex-col md:flex-row gap-2 justify-center items-center text-center">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  minLength={6}
                  className="w-full md:w-[80%] passwordInput border border-black text-black rounded px-2 py-4"
                  value={formValues.password}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    })
                  }
                  required
                  autoComplete="username"
                />
                <button
                  className="w-full md:w-[30%] text-center bg-red-600 text-white rounded py-4 px-2  "
                  type="submit"
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <button
                className="w-[80%] md:w-[140px] bg-red-600 text-white rounded py-4 px-2 md:px-6"
                onClick={() => {
                  handleGetStarted();
                }}
              >
                Get Started
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

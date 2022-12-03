import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Link, useLocation, useNavigate  } from "react-router-dom";
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';
import { GoogleAuthProvider } from "firebase/auth";
import useToken from '../../hooks/useToken';


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signInUser } = useContext(AuthContext);
  const [signUpError, setSignUpError] = useState("");
  const [loginUserEmail, setLoginUserEmail] = useState('');
  const [token] = useToken(loginUserEmail);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.form?.pathname || "/";

  if (token) {
    navigate(from, { replace: true });
  }

  const onSubmit = (data) => {
    console.log(data);
    setSignUpError("");

    signInUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast("You have been logged in");
        setLoginUserEmail(data.email);
      })
      .catch((error) => {
        toast(error.message);
        setSignUpError(error.message)
      });

    // reset form data after submit
    document.getElementById("contact-form").reset();
  };

  const { providerLogin } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleLogin = () => {
    providerLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });
        toast("Login Successful");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        toast("Login Failed"+errorMessage);
      });
  };

  return (
    <div className="lg:px-56 bg-base-200 pb-20">
      <h1 className="text-3xl text-center font-bold py-10">Login</h1>

      <div className="flex justify-center">
        <Form onSubmit={handleSubmit(onSubmit)} id="contact-form" className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", 
                { 
                  required: "**Email is Required", 
                  pattern: { value: /^\S+@\S+$/i, message: "**Invalid Email" } 
                }
                )} 
                placeholder="Enter your email"
                className="input input-bordered"
              />
              {errors.email && <p className="text-red-700 mt-2">{errors.email?.message}</p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be 6 characters long" },
                  pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                })}
                placeholder="Enter your name"
                className="input input-bordered"
              />
              {errors.password && <p className="text-red-700 mt-2">{errors.password?.message}</p>}
            </div>
            <div className="form-control mt-6">
              <button className="btn text-white border-0 hover:bg-orange-400 hover:text-white">
                Submit
              </button>
            </div>

            <div className="form-control">
              <p className="text-center">
                Don't have an account?{" "}
                <Link to="/signup" className="text-orange-400">
                  Sign Up
                </Link>
              </p>
            </div>
            <div className="divider">OR</div>
            <div className="form-control">
              <button onClick={handleGoogleLogin} className="btn text-white border-0 hover:bg-orange-400 hover:text-white">
                Sign In With Google
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;

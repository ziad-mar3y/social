import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { scheme } from "../../Schema/RegisterSchema";
import { loginApi} from "../../Services/AuthApi";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loginscheme } from "../../Schema/LoginSchema";
import { authContext } from "../../Contexts/AuthContextProvider";
import { themeContext } from "../../Contexts/ThemeContext";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errMesg, setErrMesg] = useState("");
  const navigate = useNavigate();
  const {setIsLoggedIn} = useContext(authContext)
  const {setTheme} = useContext(themeContext)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(Loginscheme),
  });

  async function handleLogin(formData) {
    setErrMesg("");
    setIsLoading(true);
    const data = await loginApi(formData);
    setIsLoading(false);
    if (data.message == "success") {
      localStorage.setItem("token" , data.token)
      setIsLoggedIn(true)
      const pathnName = location.pathname;
      navigate( pathnName == "login" ? "/"  : pathnName )
      
    }else {
      setErrMesg(data)
    }
  }

  // console.log(errors);

  return (
    <>


      <div className="  bg-[url('/src/assets/image2.jpg')]  bg-no-repeat bg-cover h-screen flex items-center    ">
        <div className="container text-center  flex flex-col justify-center items-center min-h-min ">
          <form
            onSubmit={handleSubmit(handleLogin)}
            action=""
            className="mx-auto w-full xs:w-[300px]  xs:p-2 sm:w-[400px] sm:p-5 md:py-10 text-center mt-10 mb-11 border-3  rounded-3xl pb-15 bg-gradient-to-r  from:gded to-gded2 shadow-lg/70 "
          >
            <h1 className="text-3xl font-bold py-5 text-white text-shadow-lg/50 relative under-line tall-underline mb-6">
              Login to the community
            </h1>
       
            <Input
              className="w-full mb-3 text-white  "
              classNames={{
                label: "text-blue-500 !text-white",
                errorMessage: "text-red-500 font-bold text-md",
              }}
              type="email"
              {...register("email")}
              id="email"
              label="Email"
              variant="bordered"
              isInvalid={Boolean(errors.email?.message)}
              errorMessage={errors.email?.message}
            />
            <Input
              className="w-full  mb-3 text-white   "
              classNames={{
                label: "text-blue-500 !text-white",
                errorMessage: "text-red-500 font-bold text-md",
              }}
              type="password"
              {...register("password")}
              id=""
              label="Password"
              variant="bordered"
              isInvalid={Boolean(errors.password?.message)}
              errorMessage={errors.password?.message}
            />
        

            <Button
              type="submit"
              className="mt-4 hover:bg-gded3 hover:text-black hover:border-0 font-bold bg-gded2 text-white  shadow-lg/70"
              isLoading={isLoading}
            >
              Login
            </Button>
            { errMesg && <p className="text-center text-danger-400 mt-2"> {errMesg} </p>}
                <p className="text-white mt-5 text-start ">
              you dont have an acount ?
              <Link className="text-fuchsia-400 ml-2" to={"/register"}>
                 Register Now
              </Link>
            </p>

          </form>

        </div>
      </div>
    </>
  );
}

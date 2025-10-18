import { Button, Input, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { scheme } from "../../Schema/RegisterSchema";
import { registerApi } from "../../Services/AuthApi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errMesg, setErrMesg] = useState("");
  const [succMesg, setSuccMesg] = useState("");
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(scheme),
  });

  async function handleRegister(formData) {
    setErrMesg("");
    setSuccMesg("");
    setIsLoading(true);
    const data = await registerApi(formData);
    setIsLoading(false);
    console.log(data);

    if (data.error) {
      setErrMesg(data);
    } else if (data.message) {
      setSuccMesg(data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }



  return (
    <>
      {/* <div className="flex gap-3 justify-center items-center">
        <input
          type="radio"
          id="male"
          {...register("gender")}
          name="male"
          className="peer/male"
        />
        <label
          htmlFor="male"
          className="peer-checked/male:text-sky-700 peer-checked/male:font-bold peer-checked/male:text-shadow-lg/50"
        >
          Male
        </label>
        <input
          type="radio"
          id="femal"
          {...register("gender")}
          name="female"
          className="peer/female"
        />
        <label
          htmlFor="female"
          className="peer-checked/female:text-pink-600 peer-checked/female:font-bold peer-checked/female:text-shadow-lg/50"
        >
          Female
        </label>
      </div> */}

      <div className="  bg-[url('/src/assets/image2.jpg')]  bg-no-repeat bg-cover h-screen flex items-center    ">
        <div className="container text-center flex flex-col justify-center items-center min-h-min ">
          <form
            onSubmit={handleSubmit(handleRegister)}
            action=""
            className="mx-auto text-center mt-5 m-b-5 border-3 p-5 rounded-3xl pb-15 bg-gradient-to-r  from:gded to-gded2 shadow-lg/70 "
          >
            <h1 className="text-3xl font-bold py-5 text-white text-shadow-lg/50 relative under-line tall-underline   mb-6">
              Join the community{" "}
            </h1>
            <Input
              className="w-90 mb-3 text-white "
              classNames={{
                label: "text-blue-500 !text-white",
                errorMessage: "text-red-500 font-bold text-md",
              }}
              type="text"
              {...register("name")}
              id="name"
              label="Name"
              variant="bordered"
              errorMessage={errors.name?.message}
              isInvalid={Boolean(errors.name?.message)}
            />
            <Input
              className="w-90 mb-3 text-white "
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
              className="w-90 mb-3 text-white "
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
            <Input
              className="w-90 mb-3 text-white "
              classNames={{
                label: "text-blue-500 !text-white",
                errorMessage: "text-red-500 font-bold text-md",
              }}
              type="password"
              {...register("rePassword")}
              id="rePassword"
              label="Confirm Password"
              variant="bordered"
              isInvalid={Boolean(errors.rePassword?.message)}
              errorMessage={errors.rePassword?.message}
            />
            <Input
              className="w-90 mb-3 py-3  text-white"
              classNames={{
                label: "text-blue-500 !text-white",
                errorMessage: "text-red-500 font-bold text-md",
              }}
              type="date"
              {...register("dateOfBirth")}
              id="date"
              label="Date of Birth"
              variant="bordered"
              isInvalid={Boolean(errors.dateOfBirth?.message)}
              errorMessage={errors.dateOfBirth?.message}
            />

            <div className="flex w-full flex-wrap md:flex-nowrap gap-4 0 ">
              <Select
                className="text-white"
                classNames={{
                  label: "text-blue-500 !text-white",
                  errorMessage: "text-red-500 font-bold text-md",
                }}
                label="Gender"
                {...register("gender")}
                variant="bordered"
                isInvalid={Boolean(errors.gender?.message)}
                errorMessage={errors.gender?.message}
              >
                <SelectItem className="" key={"male"}>
                  male
                </SelectItem>
                <SelectItem key={"female"}>female</SelectItem>
              </Select>
            </div>

            <Button
              type="submit"
              className="mt-4 hover:bg-gded3 hover:text-black hover:border-0 font-bold bg-gded2 text-white  shadow-lg/70"
              isLoading={isLoading}
            >
              Submit
            </Button>
            { errMesg && <p className="text-center text-danger-400 mt-2"> {errMesg} </p>}
            { succMesg && <p className="text-center text-primary-600 mt-2"> {succMesg} </p>}
            <p className="text-white mt-5 text-start">
              you have an acount ?{" "}
              <Link className="text-fuchsia-400 ml-2" to={"/login"}>
                login Now
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

import apiRoutes from "@/api";
import { Logo } from "@/assets/svgs";
import { FormProvider } from "@/components/hook-form/FormProvider";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Roles } from "./roles";
import Cookies from "js-cookie"
const Login = () => {
  const methods = useForm();
  const { handleSubmit } = methods;
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(apiRoutes.auth.login, data);
      return res;
    },
  });
  const navigate = useNavigate();
  const submitHandler = (data: any) => {
    Cookies.set('roles',  JSON.stringify(Roles))
    console.log(JSON.parse(Cookies.get('roles')!).includes('getProduct'))
    mutate(data, {
      onSuccess(data) {
        toast("تمت  تسجيل الدخول بنجاح");
        // console.log(data.data.authorisation.token)
        localStorage.setItem("token", data.data.authorisation.token);
        navigate("/");
       
      },
    });
  };
  return (
    <div className="bg-login px-12  relative z-0 w-full h-screen">
      <div className="flex relative w-full h-full gap-12 z-10 justify-center items-center">
        <div className="bg-[#ffffffc7]  h-[550px] text-black w-[500px]  p-6 rounded-[40px] flex flex-col gap-10">
          <div className="flex justify-between text-end">
            <div className="flex flex-col">
              <p className="text-sm text-gray-500">No Account ?</p>
              <p className="text-sm text-primary">Sign up</p>
            </div>
            <p className="font-md text-lg">
              Welcome to <span className="text-primary">HTC</span>
            </p>
          </div>
          <h1 className="text-4xl font-md text-black text-end">Sign in</h1>
          <FormProvider
            onSubmit={handleSubmit(submitHandler)}
            methods={methods}
          >
            <div className="flex flex-col gap-4 mt-6 text-end">
              <RHFTextField
                inputClassName="bg-white rounded-[9px]"
                name="email"
                label="Enter your username or email address"
                placeholder="Enter your username or email address"
              />
              <RHFTextField
                inputClassName="bg-white rounded-[9px]"
                name="password"
                type="password"
                label="Enter your Password"
                placeholder="Password"
              />
              <p className="text-start text-primary">Forgot Password</p>
              <div className="flex w-[200px] justify-start">
                <Button disabled={isPending} className="w-full">
                  {isPending ? "Please Wait..." : "Sign in"}
                </Button>
              </div>
            </div>
          </FormProvider>
        </div>
        <div className="bg-gradient-to-r w-[650px] items-center  text-end from-gray-600 to-gray-200 rounded-[40px] p-6 flex flex-col">
          <div className="flex  justify-center items-center">
            <h1 className="text-5xl text-white font-md">HTC</h1>{" "}
            <Logo width={150} height={150} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl text-white font-md">
              Buying car spare parts is easy with us
            </h1>
            <p className="text-sm text-white font-sm">
              Car maintenance programs and selling all our car supplies. It has
              many features needed to take care of your car at affordable priced
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { FormEvent } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Form from "../../component/Layout/Form";
import H1 from "../../component/Layout/Text/H3";
import { authResponseData } from "../../type/API/User";

function Login() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleSuccess = (data: authResponseData) => {
    nav("./");
    Cookies.set("refreshToken", data.refreshToken);
    Cookies.set("accessToken", data.accessToken);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900  w-screen">
      <div className="flex flex-col items-center justify-center mx-auto h-screen lg:py-0">
        <a
          href="#"
          className="flex flex-col justify-around items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <H1
            content={"Sign in to your account"}
            variant="text-xl leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white"
          />
        </a>

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Form
              formVariant="space-y-4 md:space-y-6"
              input={[
                {
                  id: "email",
                  label: "Email",
                  types: "text",
                  inputVariant:
                    "bg-gray-50 my-2 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                  wrapInputVariant: "flex w-full rounded-md items-center",
                  labelVariant:
                    "block basis-1/3 text-sm font-medium text-gray-900 dark:text-white",
                },
                {
                  id: "password",
                  label: "password",
                  types: "text",
                  inputVariant:
                    "bg-gray-50 my-2 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                  wrapInputVariant: "flex w-full rounded-md items-center",
                  labelVariant:
                    "block basis-1/3 text-sm font-medium text-gray-900 dark:text-white",
                },
                {
                  id: "check",
                  label: "Remember me",
                  types: "checkbox",
                  wrapInputVariant:
                    "flex w-full my-2 rounded-md flex flex-row justify-center items-center gap-2",
                },
              ]}
              onSubmitSuccess={handleSuccess}
              onSubmitFail={function (error: object): void {
                throw new Error("Function not implemented.");
              }}
            />
            <div id="error" className="sr-only"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;

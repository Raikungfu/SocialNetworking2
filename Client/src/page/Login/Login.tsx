import { useNavigate } from "react-router-dom";
import Form from "../../component/Layout/Form";
import { authResponseData } from "../../type/API/User";
import { H1 } from "../../component/Layout/Text/H1";
import { API_LOG_USER } from "../../service/UserAuth/fetchUserAuth";
import { useDispatch } from "react-redux";
import { loginUser } from "../../hook/UserSlice";

function Login() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const handleSuccess = (data: object) => {
    const user = data as authResponseData;
    dispatch(loginUser(user));
    nav("/");
  };

  const handleError = (error: string) => {
    const errorMessage = document.createElement("h1");
    errorMessage.innerText = error;
    const errorDiv = document.getElementById("error");
    errorDiv?.classList.remove("sr-only");
    errorDiv?.appendChild(errorMessage);
    setTimeout(() => {
      document.getElementById("error")?.removeChild(errorMessage);
      errorDiv?.classList.add("sr-only");
    }, 3000);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900  w-screen">
      <div className="flex flex-col items-center justify-center mx-auto h-screen lg:py-0">
        <a
          href="#"
          className="flex flex-col justify-around items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <H1 content={"Sign in to your account"} />
        </a>

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Form
              formVariant="space-y-4 md:space-y-6"
              inputVariant="w-full bg-gray-50 my-2 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              wrapInputVariant="flex rounded-md items-center"
              labelVariant="block basis-1/3 text-sm font-medium text-gray-900 dark:text-white"
              input={[
                {
                  id: "email",
                  label: "Email",
                  types: "text",
                  required: true,
                  placeholder: "Enter your email...",
                },
                {
                  id: "password",
                  label: "Password",
                  types: "password",
                  required: true,
                  placeholder: "••••••••",
                },
                {
                  id: "check",
                  label: "Remember me",
                  types: "checkbox",
                  inputVariant:
                    "w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800",
                  wrapInputVariant:
                    "flex flex-row justify-center w-full rounded-md items-center flex-row-reverse gap-2",
                  labelVariant: "font-light text-gray-500 dark:text-gray-300",
                },
              ]}
              onSubmitSuccess={handleSuccess}
              onSubmitFail={handleError}
              apiFetchForm={API_LOG_USER}
            />
            <div id="error" className="sr-only"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;

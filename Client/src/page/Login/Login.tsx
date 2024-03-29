import { Link, useNavigate } from "react-router-dom";
import Form from "../../component/Layout/Form";
import { authResponseData } from "../../type/API/User";
import { H1 } from "../../component/Layout/Text/H1";
import { API_LOG_USER } from "../../service/UserAuth/fetchUserAuth";
import { useDispatch } from "react-redux";
import { loginUser } from "../../hook/UserSlice";
import { refreshSocket } from "../../config/socketIO";

function Login() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const handleSuccess = (data: object) => {
    const user = data as authResponseData;
    dispatch(loginUser(user));
    refreshSocket();
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
                  pattern:
                    "[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$",
                  title: "Email must be a valid email address",
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
              groupBtn={{
                id: "login-btn",
                buttons: [
                  {
                    label: "Login",
                    variant: "summit-button",
                    type: "submit",
                    className: "px-5 py-2",
                    id: "summit-btn",
                  },
                  {
                    label: "Reset",
                    variant: "summit-button",
                    type: "reset",
                    className:
                      "px-5 py-2 bg-red-100 border-red-300 text-red-900 shadow-lg shadow-red-400 hover:border-red-500",
                    id: "reset-btn",
                  },
                ],
                variant: "flex justify-end gap-3",
              }}
            />
            <div id="error" className="sr-only text-red-500"></div>
            <div className="flex flex-col">
              <h5>
                Don't have an account?&nbsp;
                <Link to="/register" className="text-red-500">
                  Register here
                </Link>
              </h5>
              <Link to="/" className="hover:text-red-500">
                Dashboard
              </Link>
              <h5>
                About me&nbsp;
                <Link to="/about" className="text-red-500">
                  read here...
                </Link>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;

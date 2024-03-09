import { Link } from "react-router-dom";
import Form from "../../component/Layout/Form";
import { H1 } from "../../component/Layout/Text/H1";
import { API_REG_USER } from "../../service/UserAuth/fetchUserAuth";

function Register() {
  const handleSuccess = () => {
    const successDiv = document.getElementById("success");
    successDiv?.classList.remove("sr-only");
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
          <H1 content={"Create an account"} />
        </a>

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Form
              formVariant="space-y-4 md:space-y-6"
              inputVariant="bg-gray-50 my-2 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              wrapInputVariant="flex w-full rounded-md items-center"
              labelVariant="block basis-1/3 text-sm font-medium text-gray-900 dark:text-white"
              input={[
                {
                  id: "email",
                  label: "Your email",
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
                  id: "confirm-password",
                  label: "Confirm password",
                  types: "password",
                  required: true,
                  placeholder: "••••••••",
                },
                {
                  id: "gender",
                  label: "Gender",
                  types: "radio",
                  required: true,
                  groupInput: {
                    wrapInputVariant: "flex flex-row items-center gap-4 py-1",
                    labelVariant:
                      "text-sm font-medium text-gray-900 dark:text-white",
                    input: [
                      {
                        value: "male",
                        label: "Male",
                        id: "male",
                        name: "gender",
                      },
                      {
                        value: "female",
                        label: "Female",
                        id: "Female",
                        name: "gender",
                      },
                    ],
                  },
                },
                {
                  id: "age",
                  label: "Age",
                  types: "date",
                  required: true,
                },
                {
                  id: "term",
                  label: "I accept the Terms and Conditions",
                  types: "checkbox",
                  value: "accepted",
                  inputVariant:
                    "w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800",
                  wrapInputVariant:
                    "flex flex-row justify-center w-full rounded-md items-center flex-row-reverse gap-2",
                  labelVariant: "font-light text-gray-500 dark:text-gray-300",
                  required: true,
                },
              ]}
              onSubmitSuccess={handleSuccess}
              onSubmitFail={handleError}
              apiFetchForm={API_REG_USER}
              groupBtn={{
                id: "register-btn",
                buttons: [
                  {
                    label: "Register",
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
            <div id="success" className="sr-only">
              <span>Register successful... </span>
              <Link to="/login">Login now</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;

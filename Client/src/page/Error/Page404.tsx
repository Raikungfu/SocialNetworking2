import { Link } from "react-router-dom";
import { H1 } from "../../component/Layout/Text/H1";
import { P } from "../../component/Layout/Text/P";

const Page404 = () => {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 w-screen h-screen">
      <div className="text-center">
        <H1 className="font-extrabold dark:text-red-600" content="404" />
        <H1
          className="text-indigo-600 dark:text-indigo-600"
          content="Page not found!"
        />

        <P
          variant="mt-6 text-base leading-7 text-white-600 dark:text-white-600"
          text="Sorry, we couldn’t find the page you’re looking for."
        />
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            id={"goBack-btn"}
            to={"/"}
            className={"access-link"}
            children={
              <p>
                <span aria-hidden="true">&larr;</span> Go back home
              </p>
            }
          />
          <Link
            id={"contact-btn"}
            to={"/contact-us"}
            className={"access-link"}
            children={
              <p>
                Contact support <span aria-hidden="true">&rarr;</span>
              </p>
            }
          />
        </div>
      </div>
    </main>
  );
};
export default Page404;

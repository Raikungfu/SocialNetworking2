import Img from "../../component/Layout/Img";
import { H1 } from "../../component/Layout/Text/H1";
import logo from "../../assets/img/logo.png";
import logoAvt from "../../assets/img/avtLogo.jpg";
import Paragraph from "../../component/Layout/Text/Paragraph";
import { useState } from "react";

const About: React.FC = () => {
  const [isOpenLogoParagraph, setIsOpenLogoParagraph] =
    useState<boolean>(false);
  const [isOpenAvtParagraph, setIsOpenAvtParagraph] = useState<boolean>(false);

  const handleOnMouseEnterLogo = () => {
    setIsOpenLogoParagraph(true);
  };
  const handleOnMouseEnterAvt = () => {
    setIsOpenAvtParagraph(true);
  };
  const handleOnMouseLeave = () => {
    setIsOpenLogoParagraph(false);
    setIsOpenAvtParagraph(false);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div
        className="flex-1 flex flex-row items-center justify-center gap-20 "
        onMouseEnter={handleOnMouseEnterLogo}
        onMouseLeave={handleOnMouseLeave}
      >
        <Img
          src={logo}
          alt="logo-project"
          variant="banner"
          id="banner-logo"
          className="transform translate-x"
        />
        {isOpenLogoParagraph && (
          <Paragraph
            wrapClassName=""
            contentClassName="flex flex-col justify-center flex-col-reverse gap-5"
            children={
              <H1 content="Rai Yugi Networking" className="text-red-500" />
            }
            content={"Project in OJT semester"}
          />
        )}
      </div>

      <H1
        content={"About Me"}
        className="text-3xl relative text-red-500 text-center after:ml-2 after:top-1/2 after:absolute after:border-t-2 after:w-96 after:border-red-400 before:absolute before:top-1/2 before:border-t-2 before:w-96 before:border-blue-400 before:transform before:-translate-x-[100%] before:-ml-2"
      />
      <div
        className="flex-1 flex flex-row items-center justify-center gap-20"
        onMouseEnter={handleOnMouseEnterAvt}
        onMouseLeave={handleOnMouseLeave}
      >
        {isOpenAvtParagraph && (
          <Paragraph
            wrapClassName="text-right"
            contentClassName="flex flex-col justify-center flex-col-reverse gap-5"
            children={<H1 content="Rai Yugi" className="text-blue-500" />}
            content={
              "FPT University \n FullStack Developer \n Watch movie, listen to music and coding"
            }
          />
        )}
        <Img
          src={logoAvt}
          alt="logo-project"
          variant="avt"
          id="banner-avt"
          className="w-48 h-48"
        />
      </div>
    </div>
  );
};

export default About;

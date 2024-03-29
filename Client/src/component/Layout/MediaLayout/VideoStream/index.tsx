import React from "react";

interface VideoStreamProps {
  childrencomp: JSX.Element[];
}

const VideoStream: React.FC<VideoStreamProps> = (props) => {
  let cmp: JSX.Element;
  if (props.childrencomp?.length === 1) {
    cmp = <div className="max-w-5/6">{props.childrencomp[0]}</div>;
  } else if (props.childrencomp && props.childrencomp.length <= 4) {
    cmp = (
      <>
        {props.childrencomp?.map((media) => {
          return <div className="w-1/2 p-2">{media}</div>;
        })}
      </>
    );
  } else if (props.childrencomp && props.childrencomp.length <= 6) {
    cmp = (
      <>
        {props.childrencomp?.map((media) => {
          return <div className="w-1/3 p-2">{media}</div>;
        })}
      </>
    );
  } else if (props.childrencomp && props.childrencomp.length <= 8) {
    cmp = (
      <>
        {props.childrencomp?.map((media) => {
          return <div className="w-1/4 p-2">{media}</div>;
        })}
      </>
    );
  } else if (props.childrencomp && props.childrencomp.length <= 10) {
    cmp = (
      <>
        {props.childrencomp?.map((media) => {
          return <div className="w-1/5 p-2">{media}</div>;
        })}
      </>
    );
  } else {
    cmp = (
      <>
        {props.childrencomp?.map((media) => {
          return <div className="w-1/6 p-2">{media}</div>;
        })}
      </>
    );
  }
  return (
    <div className="flex flex-row w-full flex-wrap justify-center items-center">
      {cmp}
    </div>
  );
};

export default VideoStream;

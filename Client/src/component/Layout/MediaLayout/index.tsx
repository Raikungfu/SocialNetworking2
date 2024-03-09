import React, { useState, useEffect } from "react";
import { MediaLayoutProps } from "./type";
import Img from "../Img";

const getImageDimensions = (
  imageUrl: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = (error) => {
      reject(error);
    };
    img.src = imageUrl;
  });
};

const getVideoDimensions = (
  videoUrl: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      resolve({ width: video.videoWidth, height: video.videoHeight });
    };
    video.onerror = (error) => {
      reject(error);
    };
    video.src = videoUrl;
  });
};

const MediaLayout: React.FC<MediaLayoutProps> = (props) => {
  const [layoutStyle, setLayoutStyle] = useState<boolean>(false);

  useEffect(() => {
    const determineLayoutStyle = async () => {
      if (props.children && props.children.length >= 2) {
        const firstChild = props.children[0];
        let mediaType;
        let getDimensions;

        if (firstChild.url && firstChild.type.startsWith("image")) {
          mediaType = "image";
          getDimensions = getImageDimensions;
        } else if (firstChild.url && firstChild.type.startsWith("video")) {
          mediaType = "video";
          getDimensions = getVideoDimensions;
        }
        if (mediaType && getDimensions) {
          const { width, height } = await getDimensions(firstChild.url);
          if (width > height) {
            setLayoutStyle(true);
          } else {
            setLayoutStyle(false);
          }
        }
        console.log(layoutStyle);
      }
    };
    determineLayoutStyle();
  }, []);

  if (props.children?.length === 1) {
    props.children?.map((media, index) => {
      if (media.type.startsWith("image")) {
        return <Img key={index} alt="image post" src={media.url} />;
      } else {
        return <video controls key={index} src={media.url}></video>;
      }
    });
  } else if (
    props.children &&
    props.children.length % 2 === 0 &&
    !layoutStyle
  ) {
    return (
      <div className="flex flex-row flex-wrap -mx-2 justify-center items-center">
        {props.children?.map((media, index) => {
          if (media.type.startsWith("image")) {
            return (
              <Img
                key={index}
                alt="image post"
                src={media.url}
                className="w-full rounded-md mb-2 md:w-1/2 px-2 object-contain"
              />
            );
          } else {
            return (
              <video
                controls
                key={index}
                src={media.url}
                className="w-full rounded-md mb-2 md:w-1/2 px-2 object-contain"
              ></video>
            );
          }
        })}
      </div>
    );
  } else if (props.children && props.children.length === 3 && !layoutStyle) {
    return (
      <div className="flex flex-row flex-wrap -mx-2 justify-center items-center">
        {props.children[0].type.startsWith("image") ? (
          <Img
            alt="image post"
            src={props.children[0].url}
            className="w-full rounded-md mb-2 md:w-1/2 px-2 object-contain"
          />
        ) : (
          <video
            controls
            src={props.children[0].url}
            className="w-full rounded-md mb-2 md:w-1/2 px-2 object-contain"
          ></video>
        )}
        <div className="flex flex-col w-1/2 justify-center items-center">
          {props.children.slice(1).map((child, index) => {
            if (child.type.startsWith("image")) {
              return (
                <Img
                  key={index}
                  alt="image post"
                  src={child.url}
                  className="w-full rounded-md mb-2 px-2 object-contain"
                />
              );
            } else {
              return (
                <video
                  key={index}
                  controls
                  src={child.url}
                  className="w-full rounded-md mb-2 px-2 object-contain"
                ></video>
              );
            }
          })}
        </div>
      </div>
    );
  } else if (props.children && props.children.length === 5) {
    return (
      <div className="flex flex-row flex-wrap -mx-2 justify-center items-center">
        <div className="flex flex-col">
          {props.children.slice(0, 1).map((child, index) => {
            if (child.type.startsWith("image")) {
              return (
                <Img
                  key={index}
                  alt="image post"
                  src={child.url}
                  className="w-full rounded-md mb-2 md:w-1/2 md:h-1/2 h-full px-2 object-contain"
                />
              );
            } else {
              return (
                <video
                  key={index}
                  controls
                  src={child.url}
                  className="w-full rounded-md mb-2 md:w-1/2 px-2 md:h-1/2 h-full object-contain"
                ></video>
              );
            }
          })}
        </div>
        <div className="flex flex-col justify-center items-center">
          {props.children.slice(2, 5).map((child, index) => {
            if (child.type.startsWith("image")) {
              return (
                <Img
                  key={index}
                  alt="image post"
                  src={child.url}
                  className="w-full rounded-md mb-2 md:w-1/2 px-2 md:h-1/3 h-full object-contain"
                />
              );
            } else {
              return (
                <video
                  key={index}
                  controls
                  src={child.url}
                  className="w-full rounded-md mb-2 md:w-1/2 px-2 md:h-1/3 h-full object-contain"
                ></video>
              );
            }
          })}
        </div>
      </div>
    );
  } else if (layoutStyle && props.children && props.children.length <= 6) {
    return (
      <div className="flex flex-row flex-wrap -mx-2 justify-center items-center">
        {props.children.map((child, index) => {
          if (child.type.startsWith("image")) {
            return (
              <Img
                key={index}
                alt="image post"
                src={child.url}
                className="w-full rounded-md mb-2 md:w-1/2 px-2 object-contain"
              />
            );
          } else {
            return (
              <video
                key={index}
                controls
                src={child.url}
                className="w-full rounded-md mb-2 md:w-1/2 px-2 object-contain"
              ></video>
            );
          }
        })}
      </div>
    );
  } else {
    return (
      <div className="flex flex-row flex-wrap -mx-2 justify-center items-center">
        {props.children?.map((media, index) => {
          if (media.type.startsWith("image")) {
            return (
              <Img
                key={index}
                alt="image post"
                src={media.url}
                className="w-full rounded-md mb-2 sm:w-1/2 md:w-1/3 px-2 object-contain"
              />
            );
          } else {
            return (
              <video
                controls
                key={index}
                src={media.url}
                className="w-full rounded-md mb-2 sm:w-1/2 md:w-1/3 px-2 object-contain"
              ></video>
            );
          }
        })}
      </div>
    );
  }
};

export default MediaLayout;

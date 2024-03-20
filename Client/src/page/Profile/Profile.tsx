import Img from "../../component/Layout/Img";
import avt from "../../assets/img/avtLogo.jpg";
import cover from "../../assets/img/cover.jpg";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_GET_USER_PROFILE } from "../../service/Community/fetchCommunity";
import { User } from "../../component/Layout/List/type";
import { H1 } from "../../component/Layout/Text/H1";
import { H3 } from "../../component/Layout/Text/H3";
import dayjs from "dayjs";
import { PostProps } from "../../component/Content/Post/type";
import MenuRight from "../../component/Menu/MenuRight/MenuRight";
import InfiniteScroll from "react-infinite-scroller";
import Card from "../../component/Layout/Card";
import LoadingPost from "../../component/Layout/Skeleton/LoadingPost";
import { API_USER_PROFILE_GET_POSTS } from "../../service/Post/fetchPost";
import Form from "../../component/Layout/Form/FormInputWithAttachFile";
import Button from "../../component/Layout/Button";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { IndividualSendMessage } from "../../component/Layout/Form/FormInputWithAttachFile/types";
import {
  API_USER_UPLOAD_AVT,
  API_USER_UPLOAD_COVER,
} from "../../service/Profile";
import { useSelector } from "react-redux";
import { RootState } from "../../hook/rootReducer";

const Profile: React.FC = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState<User>({ id: "", _id: "" });
  const [listPost, setListPost] = useState<PostProps[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [pageStart, setPageStart] = useState<number>(1);
  const nav = useNavigate();
  const me = useSelector((state: RootState) => state.user.userState.id);

  const loadMore = async () => {
    const response = await API_USER_PROFILE_GET_POSTS({
      page: pageStart,
      id: userData?._id,
    });

    if (response) {
      const data = response as unknown as PostProps[];
      data && data.length > 0
        ? setListPost((prev) => [...prev, ...data])
        : setHasMore(false);
      setPageStart(pageStart + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfileData = (await API_GET_USER_PROFILE({
          id: id,
        })) as unknown as User;
        setUserData(userProfileData);
        setPageStart(1);
        setListPost([]);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchData();
    return () => {};
  }, [id]);

  const handleOpenProfile = (id: string) => {
    nav(`/profile/${id}`);
  };

  const handleError = (error: string) => {
    console.log(error);
  };

  const handleUploadAvtSuccess = async (response: IndividualSendMessage) => {
    const res = (await API_USER_UPLOAD_AVT({
      data: response,
    })) as unknown as string;
    setUserData((prev) => ({
      ...prev,
      avt: res,
    }));
  };

  const handleUploadCoverSuccess = async (response: IndividualSendMessage) => {
    const res = (await API_USER_UPLOAD_COVER({
      data: response,
    })) as unknown as string;
    setUserData((prev) => ({
      ...prev,
      cover: res,
    }));
  };

  return (
    <>
      {userData ? (
        <div className=" flex flex-row w-screen py-16">
          <div className=" flex-1 flex flex-col items-center pr-10">
            <Img
              className="relative"
              src={userData.cover ? userData.cover : cover}
              alt="cover"
              variant="banner"
            />
            {me === id && (
              <Form
                formVariant="absolute -left-[74rem] top-[25rem] w-full p-4 items-center"
                wrapInputVariant=" flex flex-col"
                inputVariant="w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-e-full"
                input={[
                  {
                    id: "upload-avatar-file-input",
                    types: "file",
                    inputVariant: "sr-only",
                    accept: "image/*",
                    children: (
                      <Button
                        id={"upload-avatar-attach-file-btn"}
                        childrencomp={
                          <AttachFileIcon className=" p-1 rounded-full text-white bg-red-600 m-1 absolute  right-28 bottom-5" />
                        }
                        type="button"
                        onClick={() =>
                          document
                            .getElementById("upload-avatar-file-input")
                            ?.click()
                        }
                      />
                    ),
                  },
                ]}
                buttonLabel="Upload Avatar..."
                id="chat-box"
                buttonVariant="rounded-full text-white bg-red-600 absolute -right-12 bottom-4"
                onSubmitFail={handleError}
                onSubmitSuccess={handleUploadAvtSuccess}
              />
            )}
            <Img
              className="absolute top-52 left-32 avt w-40 h-40"
              src={userData.avt ? userData.avt : avt}
              alt="avt"
            />
            {me === id && (
              <Form
                formVariant="absolute -left-[20rem] top-[17rem] w-full p-4 flex flex-row items-center"
                inputVariant="w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-e-full"
                input={[
                  {
                    id: "upload-cover-file-input",
                    types: "file",
                    inputVariant: "sr-only",
                    accept: "image/*",
                    children: (
                      <Button
                        id={"upload-cover-attach-file-btn"}
                        childrencomp={
                          <AttachFileIcon className="p-1 rounded-full text-white bg-red-600 m-1 absolute  right-40 bottom-5" />
                        }
                        type="button"
                        onClick={() =>
                          document
                            .getElementById("upload-cover-file-input")
                            ?.click()
                        }
                      />
                    ),
                  },
                ]}
                id="chat-box"
                buttonLabel="Upload cover..."
                buttonVariant="rounded-full text-white bg-red-600 absolute right-2 bottom-4"
                onSubmitFail={handleError}
                onSubmitSuccess={handleUploadCoverSuccess}
              />
            )}
            <H1
              className="absolute top-[17rem] left-80 text-base font-bold"
              content={userData.name || "User"}
            />
            <H3
              variant="absolute top-[17rem] left-80 italic font-semibold pt-9"
              content={userData.gender || "none"}
            />
            <p className="absolute top-[17rem] left-80 text-base italic font-semibold pt-16">
              {dayjs(userData.age).format("DD/MM/YYYY") || "User"}
            </p>
            <div className="flex flex-row mt-28 w-full justify-between">
              <div className="flex flex-col flex-1 gap-5 p-2 py-10 px-10">
                <H3 content="Friends" />
                <div className="flex flex-row gap-3 flex-wrap">
                  {userData.friendsList?.map((friend) => {
                    return (
                      <div
                        className="flex flex-col gap-3 min-w-0"
                        onClick={() =>
                          handleOpenProfile(friend.friend?._id || "#")
                        }
                      >
                        <Img
                          variant="post"
                          className="w-20 h-20"
                          src={friend.friend?.avt || avt}
                        />
                        <p className="w-20 truncate">
                          {friend.friend?.name || "User"}{" "}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <InfiniteScroll
                hasMore={hasMore}
                initialLoad={true}
                isReverse={false}
                loadMore={loadMore}
                pageStart={pageStart}
                threshold={250}
                useCapture={false}
                useWindow={true}
                loader={<LoadingPost />}
                className="w-8/12 px-10"
              >
                {listPost?.map((post: PostProps, index) => {
                  return (
                    <Card
                      id={`post-${index}`}
                      key={`${post._id}_key`}
                      postId={post._id}
                      {...post}
                    />
                  );
                })}
              </InfiniteScroll>
            </div>
          </div>
          <div className="basis-[20%] right-[20vw]">
            <MenuRight id={"menu-right-dashboard"} />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Profile;

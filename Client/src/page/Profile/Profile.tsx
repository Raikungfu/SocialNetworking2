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

const Profile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState<User>();
  const [listPost, setListPost] = useState<PostProps[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [pageStart, setPageStart] = useState<number>(1);
  const nav = useNavigate();

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
        console.log(pageStart);
        setListPost([]);
        console.log(listPost);
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

  return (
    <>
      {userData ? (
        <div className="flex flex-row w-screen py-16">
          <div className=" flex-1 flex flex-col items-center pr-10">
            <Img
              className="relative"
              src={userData.avt || avt}
              alt="cover"
              variant="banner"
            />
            <Img
              className="absolute top-52 left-32 avt w-40 h-40"
              src={userData.cover || cover}
              alt="avt"
            />
            <H1
              className="absolute top-[17rem] left-80 text-base font-semibold"
              content={userData.name || "User"}
            />
            <H3
              variant="absolute top-[17rem] left-80 italic pt-8"
              content={userData.gender || "none"}
            />
            <p className="absolute top-[17rem] left-80 text-base italic font-semibold pt-16">
              {dayjs(userData.age).format("DD/MM/YYYY") || "User"}
            </p>
            <div className="flex flex-row mt-28 mx-16 gap-5">
              <div className="flex flex-col gap-5 flex-1 p-2 py-10">
                <H3 content="Friends" />
                <div className="grid grid-flow-row grid-cols-3 gap-3">
                  {userData.friendsList?.map((friend) => {
                    return (
                      <div
                        className="flex flex-col gap-3"
                        onClick={() =>
                          handleOpenProfile(friend.friend?._id || "#")
                        }
                      >
                        <Img
                          variant="post"
                          className="w-20 h-20"
                          src={friend.friend?.avt || avt}
                        />
                        <p>{friend.friend?.name || "User"} </p>
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
                className="w-8/12"
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

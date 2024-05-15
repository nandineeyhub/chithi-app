import React, { useEffect, useState } from "react";
import ProfileDp from "./ProfileDp";
import ProfileDetails from "./ProfileDetails";
import ProfileUpdateSubmit from "./ProfileUpdateSubmit";
import { useDispatch } from "react-redux";
import { handleProfileOpen, setProfile } from "../../Redux/ProfileSlice";
import callAPI from "../../apiUtils/apiCall";
import { apiUrls, headers, multiPartHeader } from "../../apiConfig";
import PopupWrapper from "../chat-components/PopupWrapper/PopupWrapper";
import CrossIcon from "../CrossIcon/CrossIcon";

const Index = ({ profileDetails }) => {
  const [dp, setDp] = useState(
    profileDetails?.profilePicture ? profileDetails?.profilePicture : ""
  );
  const [details, setDetails] = useState(profileDetails ? profileDetails : {});

  const dispatch = useDispatch();

  const uploadDp = async (e) => {
    setDp(e.target.files[0]);
    const formData = new FormData();
    formData.append("picture", e.target.files[0]);
    try {
      const response = await callAPI(
        apiUrls.uploadProfilePicture,
        {},
        "POST",
        formData,
        multiPartHeader
      );
      if (response?.status) {
        setDetails((value) => {
          return { ...value, profilePicture: response?.data?.fileName };
        });
      }
    } catch (error) {}
  };

  const handleChange = (e) => {
    setDetails((value) => {
      return { ...value, [e.target.name]: e.target.value };
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await callAPI(
        apiUrls.updateProfile,
        {},
        "POST",
        details,
        headers
      );

      if (response.status) {
        dispatch(setProfile(details));
      }
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(setProfile(details));
  }, [details?.profilePicture]);

  return (
    <PopupWrapper>
      <CrossIcon fn={() => {
            dispatch(handleProfileOpen());
          }}/>
      <div className="d-flex justify-content-center align-items-center h-50">
        <ProfileDp dp={dp} uploadDp={uploadDp} {...profileDetails} />
      </div>
      <ProfileDetails {...details} editFn={handleChange} />
      <ProfileUpdateSubmit handleUpdate={handleUpdate} />
    </PopupWrapper>
  );
};

export default Index;

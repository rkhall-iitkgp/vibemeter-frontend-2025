import React from "react";

interface ProfileCardProps {
  profile: {
    id: number;
    name: string;
    imgSrc: string;
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <div className="profile-card">
      <div className="profile-img">
        <img src={profile.imgSrc} alt={profile.name} />
      </div>
      <h3>{profile.name}</h3>
      <button className="select-btn">Select</button>
    </div>
  );
};

export default ProfileCard;

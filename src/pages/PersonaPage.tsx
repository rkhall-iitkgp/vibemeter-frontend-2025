import { useDispatch, useSelector } from "react-redux";
import { RootState, setPersona } from "@/store";
import { useNavigate } from "react-router";
import React, { useState } from "react";

interface Profile {
  id: string;
  name: string;
  avatar: string;
}

const ProfileSelectPage: React.FC = () => {
  const [hoveredProfile, setHoveredProfile] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profiles = useSelector(
    (state: RootState) => state.persona.available_personas
  ) as Profile[];

  const handleProfileSelect = (id: string) => {
    // Navigate to the dashboard with the selected profile ID
    console.log("Selected Profile ID:", id);
    dispatch(setPersona(id));
    navigate(`/dashboard`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-gray-800 text-4xl font-bold mb-10">Select Persona</h1>
      <div className="flex flex-wrap justify-center gap-6 md:gap-10">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="flex flex-col items-center cursor-pointer group"
            onMouseEnter={() => setHoveredProfile(profile.id)}
            onMouseLeave={() => setHoveredProfile(null)}
            onClick={() => handleProfileSelect(profile.id)}
          >
            <div
              className={`relative mb-3 overflow-hidden rounded-full border-4 ${
                hoveredProfile === profile.id
                  ? "border-[#80C342] shadow-lg"
                  : "border-gray-200"
              } transition-all duration-200`}
            >
              <div className="h-32 w-32 md:h-40 md:w-40 flex items-center justify-center">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-full w-full object-cover p-2"
                />
              </div>
            </div>
            <span
              className={`text-lg font-medium transition-colors duration-200 ${
                hoveredProfile === profile.id
                  ? "text-[#80C342]"
                  : "text-gray-700"
              }`}
            >
              {profile.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSelectPage;

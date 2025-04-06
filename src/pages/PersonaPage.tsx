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

      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="flex flex-col items-center cursor-pointer group"
            onMouseEnter={() => setHoveredProfile(profile.id)}
            onMouseLeave={() => setHoveredProfile(null)}
            onClick={() => handleProfileSelect(profile.id)} // Navigate to dashboard on click
          >
            <div
              className={`relative mb-2 overflow-hidden rounded-md border-2 ${
                hoveredProfile === profile.id
                  ? "border-[#80C342]"
                  : "border-gray-300"
              } box-border`} // Ensure box-sizing doesn't affect layout
            >
              <img
                src={profile.avatar}
                alt={profile.name}
                width={150}
                height={150}
                className="object-cover p-8"
              />
            </div>
            <span
              className={`text-gray-600 transition-colors ${
                hoveredProfile === profile.id ? "text-[#80C342]" : ""
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

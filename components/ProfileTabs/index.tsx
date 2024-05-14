"use client";
import { useContext } from "react";
import { ProfilesContext } from "@/contexts/PinnedProfiles/ProfilesContext";
import Link from "next/link";

export const ProfileTabs: React.FC = () => {
  const { profiles, removeTab } = useContext(ProfilesContext);
  return (
    <div className="min-w-[100%] flex flex-row gap-[1px] ml-5">
      {profiles.map((profile, index) => {
        const { uid, nickname } = profile;
        return (
          <div
            key={`tab-${uid}-${nickname}`}
            className="bg-sky-900 p-2 hover:bg-sky-800 text-gray-100 shadow cursor-pointer"
          >
            <Link
              href={`/profile/${uid}`}
            >
              {nickname ?? uid}
            </Link>
            {(
              <span
                className="ml-1 hover:text-orange-400"
                onClick={(event) => {
                  event.preventDefault();
                  removeTab(uid);
                }}
              >
                ×
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

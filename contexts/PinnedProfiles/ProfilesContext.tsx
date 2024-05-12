"use client"
import React, { createContext, useState, useEffect } from "react";

export type UIDPair = {
  uid: string;
  nickname: string;
  // priority?: number;
};

type ProfilesContextType = {
  profiles: UIDPair[];
  addTab: (uid: string, nickname: string) => void;
  // favouriteTab: (uid: string, nickname: string) => void;
  removeTab: (uid: string) => void;
};

const defaultValue = {
  profiles: [],
  addTab: () => {},
  // favouriteTab: () => {},
  removeTab: () => {},
} as ProfilesContextType;

const ProfilesContext = createContext(defaultValue);

const ProfilesContextProvider: React.FC<{ children: any }> = ({
  children,
}) => {
  const [profiles, setProfiles] = useState<UIDPair[]>([]);
  const [isClient, setIsClient] = useState(false)

  const limit = 5;

  useEffect(() => {
    setIsClient(true)
  }, [])

  // read from local storage
  useEffect(() => {
    if (typeof window != "undefined" && isClient) {
      const obj = JSON.parse(localStorage?.getItem("profiles") ?? "{}")
      // console.log('initial read:')
      // console.log(obj)
      if (obj && obj.profiles) {
        setProfiles(obj.profiles);
      }
    } 
  }, [isClient]);

  // save to local storage
  useEffect(() => {
    if (typeof window != "undefined" && isClient) {
      const obj = { profiles };
      //console.log('saving:')
      //console.log(obj)
      localStorage.setItem("profiles", JSON.stringify(obj));
    }
  }, [profiles]);

  const findUID = (elements: UIDPair[], uid: string) => {
    return elements.findIndex((a) => {
      const newUID = uid.trim();
      const comparedUID = a.uid;
      return newUID === comparedUID;
    });
  };

  // add tab to state
  const addTab = (uid: string, nickname: string) => {
    setProfiles((prev) => {
      const index = findUID(prev, uid);
      // console.log('index ' + index)
      if (index > -1) return prev;
      const newProfile = { uid, nickname};
      if (prev.length >= limit) {
        return prev.slice(limit - prev.length + 1).concat(newProfile)
      }
      // console.log("curr")
      // console.log(profiles)
      // console.log('new arr: ')
      // console.log(profiles.concat(newProfile))
      return profiles.concat(newProfile);
    });
  };

  // remove tab from state
  const removeTab = (uid: string) => {
    // console.log('removed called')
    setProfiles((prev) => {
      const arr = [...prev];
      const index = arr.findIndex((a) => a.uid === uid);
      if (index > -1) arr.splice(index, 1);
      return arr;
    });
  };

  const value = {
    profiles,
    addTab,
    removeTab,
  };

  return (
    <ProfilesContext.Provider value={value}>
      {children}
    </ProfilesContext.Provider>
  );
};

export { ProfilesContext, ProfilesContextProvider };

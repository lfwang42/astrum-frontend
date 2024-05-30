
import React from "react";
import SearchField from "../../components/SearchField/index";
import { NewsDisplay } from "@/components/NewsDisplay";
import { getAPIURL } from "@/lib/utils";
import { columns } from './profileColumns'
import { ProfileTable } from "@/components/ProfilesTable";
export default function Home() {
  

  return (
    <main className="min-h-screen">
      {/* <img src={icon} /> */}
      <div className="mx-auto mt-8 w-2/3 p-3 gap-2 flex flex-col justify-center items-center rounded-md border-solid border-slate-800 border-2 bg-slate-700">
        <p className="text-gray-100">
          If your profile is not available, try fetching it on enka.network
          first, and wait a few minutes.
        </p>
        <SearchField />
        <ProfileTable />
      </div>
      <div className="mx-auto mt-5 w-2/3 flex justify-center items-center">
      <NewsDisplay />
      </div>
    </main>
  );
}

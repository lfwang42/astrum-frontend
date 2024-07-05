
import React from "react";
import SearchField from "../../components/SearchField/index";
import { NewsDisplay } from "@/components/NewsDisplay";
import { ProfileTable } from "@/components/ProfilesTable";
type Props = {
  params: {locale: string};
};
export default function IndexPage({params: {locale}}: Props) {
  return (
    <main className="min-h-screen">
      <div className="mx-auto mt-8 w-[60%] p-3 gap-2 flex flex-col justify-center items-center rounded-md border-solid border-slate-800 border-2 bg-slate-700">
        <p className="text-gray-100">
          If your profile is not available, try fetching it on enka.network
          first, and wait a few minutes.
        </p>
        <SearchField />
        <ProfileTable />
      </div>
      <div className="mx-auto mt-5 w-[60%] flex justify-center items-center">
      <NewsDisplay />
      </div>
    </main>
  );
}

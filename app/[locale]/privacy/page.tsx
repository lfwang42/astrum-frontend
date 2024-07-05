import { Metadata } from 'next'

export async function generateMetadata() {
  return {
    title: 'Privacy Policy'
  };
}
// export const metadata: Metadata = {
//   title: 'Privacy Policy',
// }
export default function Privacy() {
    return (
      <div className="min-h-screen container mx-auto py-10">
        <div className="flex flex-col min-w-2/3 mt-10 bg-slate-900 min-h-[200px] p-2">
          <span className="font-bold text-lg">What data does the site collect?</span>

          <p>This website collects your Star Rail data for ranking on leaderboards and profile display.</p>
          <br />
          <span className="font-bold text-lg">Can I remove my data from the site?</span>
          <p>Set your Star Rail signature to the following:</p>
          <span className="my-3 font-bold">optout</span>
          <p>Wait 10 minutes and then refresh your profile.  Your data will be removed from the site.</p>
        </div>
      </div>
    );
  }
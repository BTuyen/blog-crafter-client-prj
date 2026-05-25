import ActionItems from "@/app/(user)/ActionItems";
import UserInfo from "@/app/(user)/UserInfo";
import { fetchUserProfile } from "@/app/(user)/profile/hooks/useFetchUser";
import { getAccessToken, getUserIdFromToken } from "@/app/(user)/profile/hooks/useAuth";
import { showToast } from "@/lib/toast";
import { redirect } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default async function ProfilePage() {
  const token = await getAccessToken();
  if (!token) {
    showToast("error", "Unauthorized: Missing access token");
    redirect("/auth?mode=login");
  }

  const userId = getUserIdFromToken(token);
  if (!userId) {
    showToast("error", "Unauthorized: Invalid user ID");
    redirect("/auth?mode=login");
  }

  const {data: userProfile} = await fetchUserProfile(token, userId);

  if (!userProfile) {
    redirect("/auth?mode=login");
  }
  const {data: user} = userProfile;

  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      <div className="w-full h-32 bg-black dark:bg-white"></div>

      {!user ? (
        <div className="w-full max-w-lg p-4">
          <Skeleton className="h-16 w-full mb-4" />
          <Skeleton className="h-24 w-full" />
        </div>
      ) : (
        <>
          <UserInfo user={user} page={'profile'} />
          <ActionItems user={user} />
        </>
      )}
    </div>
  );
}

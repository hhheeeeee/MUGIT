import UserInfo from "@/app/container/profile/userinfo";
import Mugitory from "@/app/container/profile/mugitory";
import UserFlow from "@/app/container/profile/userflow";

async function getProfile() {
  const response = await fetch("http://localhost:8080/api/users/nick/hhh", {
    method: "GET",
  });

  return response.json();
}

export default async function Page() {
  const userInfo = await getProfile();
  console.log(userInfo);
  return (
    <div>
      <UserInfo />
      <Mugitory />
      <UserFlow />
    </div>
  );
}

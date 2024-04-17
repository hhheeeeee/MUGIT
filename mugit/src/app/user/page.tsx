import UserInfo from "@/containers/user/userinfo";
import Mugitory from "@/containers/user/mugitory";

export default function Page() {
  return (
    <div className="h-screen">
      <UserInfo />
      <Mugitory />
    </div>
  );
}

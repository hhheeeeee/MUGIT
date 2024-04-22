import UserInfo from "@/containers/user/userinfo";
import Mugitory from "@/containers/user/mugitory";
import UserFlow from "@/containers/user/userflow";

export default function Page() {
  return (
    <div>
      <UserInfo />
      <Mugitory />
      <UserFlow />
    </div>
  );
}

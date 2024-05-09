import { Popover, Transition } from "@headlessui/react";
import { apiUrl } from "@/app/store/atoms";
import { useParams } from "next/navigation";
import useAsync from "@/app/hooks/useAsync";
import Loading from "@/app/components/loading";
import Error from "@/app/components/error";

const fetchFollowers = async () => {
  const response = await fetch(apiUrl + "/users/followers", {
    credentials: "include",
  });
  return response.json();
};

export default function FollowPopover({ number }: { number: string }) {
  const params = useParams();
  const [state, refetch] = useAsync(() => fetchFollowers(), []);
  const { loading, data: list, error } = state;
  if (loading) return <Loading />;
  if (error) return <Error />;
  return (
    <Popover className="relative">
      <Popover.Button className="text-2xl">{number}</Popover.Button>
      <Popover.Panel className="absolute z-10">
        <div className="h-60 w-40 border border-solid border-black bg-white"></div>
      </Popover.Panel>
    </Popover>
  );
}

import UploadPicture from "@/app/components/fileUpload/UploadPicture";
import MyRadioGroup from "@/app/container/note/RadioGroup";
import Description from "@/app/components/Description";
import UploadContainer from "@/app/components/fileUpload/UploadContainer";

export default function NotePage() {
  return (
    <main className="relative flex min-h-[90%] w-full flex-col px-52 py-10">
      <h1 className="border-b-2 border-solid border-gray-300 pl-5 text-5xl font-bold italic">
        New Note
      </h1>
      <Description target="note" />

      <div className="mt-4 flex w-full">
        {/* 사진 올리는 부분임 */}
        <UploadPicture />

        {/* 파일 가져오는 부분임 */}
        <div className="flex w-9/12 flex-col">
          <UploadContainer />

          <h2 className="mt-4 text-lg">Note Name</h2>
          <input
            type="text"
            className="h-8 w-full rounded-lg border-2 border-solid border-gray-300 border-b-gray-200 px-4"
          />

          <h2 className="mt-4 text-lg">Tags</h2>
          <input
            type="text"
            className="h-8 w-1/2 rounded-lg border-2 border-solid border-gray-300 border-b-gray-200 px-4"
          />

          <div className="mt-4 flex w-full">
            <MyRadioGroup />
          </div>

          <h2 className="mt-4 text-lg">Description</h2>
          <textarea
            placeholder="Describe your Note"
            className="h-52 w-full rounded-lg border-2 border-solid border-gray-300 border-b-gray-200 p-4"
          />

          <div className="mt-5 flex w-full justify-end gap-x-3">
            <button className="rounded-lg border-2 border-solid bg-gray-100 px-10 py-3 text-gray-600">
              Cancel
            </button>
            <button className="rounded-lg bg-pointblue px-10 py-3 text-white">
              Save
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

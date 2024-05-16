import IconRecord from "@/app/assets/icon/IconRecord";
import React from "react";

// Props 타입 적용
const RecordMessage = ({ records }) => {
  console.log(records.list);
  const recordList = records.list || [];

  return (
    <div>
      <div className="my-2 flex max-h-60 w-full flex-col gap-2 overflow-y-scroll rounded-lg border-2 border-solid border-gray-300 p-4">
        {recordList.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-col rounded-lg bg-gray-100 p-3"
            >
              <div className="flex gap-4">
                <IconRecord />
                <div>
                  <p className="mb-1"> {item.message}</p>
                  <p className="te text-xs text-gray-500">{item.data}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecordMessage;

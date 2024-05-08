import { apiUrl } from "../store/atoms";
import { FlowDetailType } from "../types/flowtype";

export async function getFlowDetail(id: string): Promise<FlowDetailType> {
  const response = await fetch(apiUrl + "/flows/" + id, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Data fetch failed");
  }
  return response.json();
}

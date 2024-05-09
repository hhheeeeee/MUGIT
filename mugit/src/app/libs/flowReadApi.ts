import { apiUrl } from "../store/atoms";
import {
  FlowDetailType,
  FlowGraphType,
  FlowReviewType,
} from "../types/flowtype";

export async function getFlowDetail(id: string): Promise<FlowDetailType> {
  const response = await fetch(apiUrl + "/flows/" + id, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Flow Detail fetch failed");
  }
  return response.json();
}

export async function getFlowGraph(id: string): Promise<FlowGraphType> {
  const response = await fetch(apiUrl + "/flows/" + id + "/graph", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Flow Graph fetch failed");
  }

  return response.json();
}

export async function getFlowReview(id: string): Promise<FlowReviewType> {
  const response = await fetch(apiUrl + "/reviews/flows/" + id, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Flow Review fetch failed");
  }

  return response.json();
}

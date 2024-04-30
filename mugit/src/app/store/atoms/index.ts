"use client";

import { Atom, atom } from "jotai";

export * from "./nowplaying";

export const address1_atom = atom("");
export const address2_atom = atom("");
export const submitting_atom = atom(false);
export function getInitialValues(
  address1: string,
  address2: string
): Array<[Atom<unknown>, unknown]> {
  return [
    [address1_atom, address1],
    [address2_atom, address2],
  ];
}

export const mugitUrl = "https://mugit.site";
export const apiUrl = "https://mugit.site/api";
export const flocalUrl = "http://localhost:3000";
export const blocalUrl = "http://localhost:8080/api";

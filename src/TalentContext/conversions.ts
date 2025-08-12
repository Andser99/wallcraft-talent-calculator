import { Dictionary, Position } from "./types";

export function tierToPosition(tier: number, column: number){
  let tierToLetterDict: Dictionary = {
    "0": "a",
    "1": "b",
    "2": "c",
    "3": "d",
    "4": "e",
    "5": "f",
    "6": "g"
  }
  return tierToLetterDict[tier.toString()]+(column+1) as Position;
}
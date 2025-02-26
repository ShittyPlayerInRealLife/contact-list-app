import { useAppSelector } from "../index";

export const useContactListSelector = () => {
  return useAppSelector((state) => state.contacts);
};

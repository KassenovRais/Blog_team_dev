import { useAppSelector } from "@/hooks/reduxHooks";

export const CheckerUser = (user_id: string) => {
  const {user} = useAppSelector((state) => state.auth);
  
  if (user) {
    if (user._id === user_id) {
      return true;
    }
    return false;
  }
};

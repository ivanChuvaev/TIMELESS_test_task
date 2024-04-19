import { createContext, useContext } from "react";
import { TUser } from "../types";

type TGlobalContext = {
  users: TUser[]
  /** fetch users request is loading  */
  loading: boolean
  /** error while fetching users */
  error: Error | null
  /** refetch users */
  refetch: () => void
  removeUser: (uuid: string) => void
}

export const globalContext = createContext<null | TGlobalContext>(null)

export const useGlobalContext = () => {
  const context = useContext(globalContext);
  if (context === null) {
    throw new Error("useGlobalContext must be used within <globalContext.Provider>")
  }
  return context;
}

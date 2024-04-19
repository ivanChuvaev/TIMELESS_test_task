import { Outlet } from "react-router";
import { globalContext } from "../contexts/globalContext";
import { useCallback, useEffect, useState } from "react";
import { TUser } from "../types";
import userService from "../services/userService";

export default function MainLayout() {

  const [users, setUsers] = useState<TUser[]>([]);
  const [error, setError] = useState<null | Error>(null);
  const [loading, setLoading] = useState(false);

  const refetch = useCallback(() => {
    setLoading(true);
    userService.getUsers()
    .then(setUsers)
    .catch(setError)
    .finally(() => setLoading(false))
  }, []);

  const removeUser = useCallback((uuid: string) => {
    setUsers((prev) => prev.filter((user) => user.uuid !== uuid))
  }, [])

  useEffect(() => {
    refetch();
  }, [])

  return (
    <globalContext.Provider value={{ users, error, loading, refetch, removeUser }}>
      <Outlet />
    </globalContext.Provider>
  )
}

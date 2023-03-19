import { useEffect, useState } from "react";
import { CanceledError } from "../services/api-client";
import UserService, { User } from "../services/user-service";


const useUser=()=>{
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const { request, cancel } = UserService.getAll<User>();
        request
        .then((res) => {
            setIsLoading(false);
            setUsers(res.data);
        })
        .catch((err) => {
            if (err instanceof CanceledError) return;
            setIsLoading(false);
            setError(err.message);
        });
        return () => cancel();
    }, []);
    return {users, error, isLoading, setUsers, setError};
}

export default useUser;
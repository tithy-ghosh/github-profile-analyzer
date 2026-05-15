import { useEffect, useState } from "react"

const useFetch = (fetchFn, username) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if(!username) return;
        setLoading(true);
        setError(null);
        fetchFn(username).then((res) =>{
            setData(res.data);

        }).catch((err) =>{
            setError(err.response?.data?.message || "Something went wrong");
        }).finally(() => {
            setLoading(false);
        })
    }, [username]);
    return { data, loading, error };
};
export default useFetch;
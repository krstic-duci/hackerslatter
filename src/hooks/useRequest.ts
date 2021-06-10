import { useState, useEffect } from "react";

const useRequest = (url: string) => {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resp = await fetch(url);
        const data = await resp.json();
        setData(data);
      } catch (e) {
        setData([]);
        setError(e);
      }
      setLoading(false);
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useRequest;

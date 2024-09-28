import { useEffect, useState } from "react";

export const enum FetchMethods {
  "GET" = "GET",
  "POST" = "POST",
  "PUT" = "PUT",
  "DELETE" = "DELETE",
  "PATCH" = "PATCH",
}

export const useFetch = <T>({
  dataBody,
  url,
  method,
}: {
  dataBody?: object;
  url: string;
  method: FetchMethods;
}) => {
  const [data, setData] = useState({} as T);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log("fetchingggggg");

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method,
        body: dataBody ? JSON.stringify(dataBody) : undefined,
      });

      if (!response.ok) throw new Error("Error :" + response.status);

      const json = await response.json();

      setData({ ...json });
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
  };
};

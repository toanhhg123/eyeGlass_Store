import { useMemo, useState } from "react";

const initFetch = {
  loading: false,
  error: "",
};

export default function useFetch() {
  const [status, setStatus] = useState(initFetch);

  const fetch = useMemo(() => {
    return async (asynFn) => {
      try {
        setStatus({ loading: true });
        const data = await asynFn();
        setStatus({ loading: false });
        return { res: data };
      } catch (error) {
        setStatus({ error: error.message });
        return { error: error.message };
      }
    };
  }, []);
  return { status, fetch };
}

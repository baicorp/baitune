import { useEffect, useState } from "react";

export default function useDebounce(stringValue: string) {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDebouncedValue(stringValue);
    }, 300);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [stringValue]);

  return debouncedValue;
}

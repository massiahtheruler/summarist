"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ReaderSize = "small" | "medium" | "large" | "xlarge";

type ReaderContextValue = {
  readerSize: ReaderSize;
  setReaderSize: (size: ReaderSize) => void;
};

const sizeValues: Record<ReaderSize, string> = {
  small: "15px",
  medium: "16px",
  large: "18px",
  xlarge: "20px",
};

const ReaderContext = createContext<ReaderContextValue | null>(null);

export function ReaderProvider({ children }: { children: ReactNode }) {
  const [readerSize, setReaderSize] = useState<ReaderSize>("medium");

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--reader-font-size",
      sizeValues[readerSize],
    );
  }, [readerSize]);

  const value = useMemo(
    () => ({
      readerSize,
      setReaderSize,
    }),
    [readerSize],
  );

  return (
    <ReaderContext.Provider value={value}>{children}</ReaderContext.Provider>
  );
}

export function useReader() {
  const context = useContext(ReaderContext);

  if (!context) {
    throw new Error("useReader must be used inside ReaderProvider");
  }

  return context;
}

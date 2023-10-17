import { useRef, useEffect } from "react";

export const useTitle = (title: string) => {
  const documentDefined = typeof document !== "undefined";
  const originalTitle = useRef(documentDefined ? document.title : null);

  useEffect(() => {
    if (!documentDefined) return;

    if (document.title !== title) document.title = title;

    const ref = originalTitle.current;
    return () => {
      document.title = ref as string;
    };
  }, [title, documentDefined]);
};

import React from "react";

export const useOnClickOutside = (ref, handler) => {
  React.useEffect(() => {
    const onClick = (e) => {
      const target = e.target;
      if (!ref.current || ref.current.contains(target)) return;

      handler(e);
    };

    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("touchstart", onClick, { capture: true });

    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("touchstart", onClick, { capture: true });
    };
  }, [handler, ref]);
};

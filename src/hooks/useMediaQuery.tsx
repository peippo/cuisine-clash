import { useEffect, useState } from "react";

/**
 *
 * @param {string[]} queries List of queries to match
 * @returns {boolean} Boolean value telling if the passed query/queries is matching
 */
function useMediaQuery(...queries: string[]): boolean {
  const supportMatchMedia =
    typeof window !== "undefined" && typeof window.matchMedia !== "undefined";

  const [match, setMatch] = useState(false);

  useEffect(() => {
    let active = true;
    if (!supportMatchMedia) return undefined;

    const query = queries.join();
    const queryList = window.matchMedia(query);

    function updateMatch() {
      if (active) setMatch(queryList.matches);
    }

    updateMatch();
    queryList.addEventListener("change", () => updateMatch());

    return () => {
      active = false;
      queryList.removeEventListener("change", () => updateMatch());
    };
  }, [queries, supportMatchMedia]);

  return match;
}

export default useMediaQuery;

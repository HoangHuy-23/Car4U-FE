import SearchFilter from "@/components/shared/searchpage/SearchFilter";
import SearchResult from "@/components/shared/searchpage/SearchResult";
import { Suspense } from "react";

const SearchPage = () => {
  return (
    <Suspense>
      <SearchFilter />
      <SearchResult />
    </Suspense>
  );
};

export default SearchPage;

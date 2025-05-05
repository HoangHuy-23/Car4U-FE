import SearchFilter from "@/components/shared/searchpage/SearchFilter";
import SearchResult from "@/components/shared/searchpage/SearchResult";

type Props = {};

const SearchPage = (props: Props) => {
  return (
    <>
      <SearchFilter />
      <SearchResult />
    </>
  );
};

export default SearchPage;

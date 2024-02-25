import { watch } from "vue";
import { fuzzySearch } from "../helper";
import useState from "./useState";

const useFuzzy = (items = [], key, searchString = "") => {
  const [isFetched, setIsFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fuzzyItems, setFuzzyItems] = useState([]);

  const searchByFilterKey = fuzzySearch(items.value, key);

  const searchCountryHandler = async () => {
    try {
      setLoading(true);
      if (searchString.trim()) {
        const response = await searchByFilterKey(searchString);
        setFuzzyItems([...response]);
      } else {
        setFuzzyItems([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  watch(
    () => searchString,
    (curr, prev) => {
      console.log("hello world");
      if (curr.trim() !== prev.trim()) {
        setIsFetched(!!curr.trim());
        setLoading(!!curr.trim());

        if (!curr.trim()) {
          setFuzzyItems([]);
        }
      }
    }
  );

  return {
    loading: loading,
    fuzzyItems: fuzzyItems,
    fuzzy: searchCountryHandler,
    fetched: isFetched,
  };
};

export default useFuzzy;

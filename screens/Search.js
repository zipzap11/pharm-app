import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Header from "../components/Search/Header";
import Wrapper from "../components/Wrapper";
import Card from "../components/Search/Card";
import Separator from "../components/Separator";
import { COLORS } from "../assets/design";
import { Dialog } from "@rneui/themed";
import { useEffect, useState } from "react";
import FilterModal from "../components/Search/FilterModal";
import axios from "axios";
import { API_BASE_URL } from "../config";
// const categories = [
//   "Batuk & Flu",
//   "Demam",
//   "Jantung",
//   "Herbal",
//   "Mulut & Tenggorokan",
//   "P3K",
//   "Minyak",
//   "Hewan",
// ];

const sortAsc = "asc";
const sortDesc = "desc";
const a = [
  {
    id: 20,
    name: "test",
    price: "12308932",
    img_url:
      "https://drive.google.com/file/d/1LIrzIiLmwH1Mb3Ww8QAmvTCBwuaiFY0h/view",
  },
];
export default function Search({ navigation, route }) {
  const [modalFilterVisible, setModalFilterVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { categoryID: catID, query: qparams } = route.params;
  const [query, setQuery] = useState(qparams);
  const [queryTrigger, setQueryTrigger] = useState(false);
  const [sortType, setSortType] = useState(sortAsc);
  const [categoryID, setCategoryID] = useState(catID);

  const handleBack = () => {
    navigation.goBack();
  };
  const toggleModalFilter = () => {
    setModalFilterVisible(!modalFilterVisible);
  };
  const submitHandler = () => {
    setQueryTrigger((p) => !p);
  };

  const filterClickHandler = (id) => {
    toggleModalFilter();
    setCategoryID(id);
  };

  const toggleSortType = () => {
    if (sortType == sortAsc) setSortType(sortDesc);
    if (sortType == sortDesc) setSortType(sortAsc);
  };
  useEffect(() => {
    setIsLoading(true);
    const queryParamObj = {};
    if (categoryID) queryParamObj.category = categoryID;
    if (query) queryParamObj.query = query;
    if (sortType) queryParamObj.sort = sortType;
    const param = new URLSearchParams(queryParamObj);
    axios
      .get(`${API_BASE_URL}/products?${param.toString()}`)
      .then((res) => {
        setIsLoading(false);
        setProducts(res.data.data);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [categoryID, queryTrigger, sortType]);

  return (
    <>
      <Header
        setValue={setQuery}
        value={query}
        onBack={handleBack}
        onSubmit={submitHandler}
      />
      <FilterModal
        title={"Pilih Kategori"}
        onPick={filterClickHandler}
        isVisible={modalFilterVisible}
        toggleModal={toggleModalFilter}
      />
      <Wrapper>
        {!isLoading && (
          <View style={styles.filterSorterContainer}>
            <Filterer onPress={toggleModalFilter} />
            <Separator horizontal={true} size={7} />
            <Sorter onPress={toggleSortType} text={"Harga Tertinggi"} />
            <Separator horizontal={true} size={7} />
            <Sorter onPress={toggleSortType} text={"Harga Terendah"} />
          </View>
        )}
        {!isLoading ? (
          products.length === 0 ? (
            <View style={styles.emptyCont}>
              <MaterialIcons
                name="hourglass-empty"
                size={40}
                color={COLORS.gray}
              />
              <Text style={styles.empty}>
                Tidak ada product dengan kriteria mu, coba gunakan filter atau
                kata kunci lain.
              </Text>
            </View>
          ) : (
            <>
              <Separator size={10} />
              <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={a}
                renderItem={({ item }) => (
                  <Card
                    id={item.id}
                    img_url={item.image_url}
                    name={item.name}
                    price={item.price}
                  />
                )}
                keyExtractor={(item, index) => index}
                columnWrapperStyle={{
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
                style={{
                  marginBottom: "35%",
                }}
              />
            </>
          )
        ) : (
          <ActivityIndicator size="large" color={COLORS.mainBlue} />
        )}
      </Wrapper>
    </>
  );
}

const Sorter = ({ onPress, text }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.6}
    style={{ ...styles.filterSorter }}
  >
    {/* <MaterialIcons style={{ ...styles.icon }} size={15} name="sort" /> */}
    <Text style={styles.textMain}>{text}</Text>
  </TouchableOpacity>
);
const Filterer = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.6}
    style={styles.filterSorter}
  >
    <MaterialIcons style={{ ...styles.icon }} size={15} name="filter-list" />
    <Text style={styles.textMain}>Filter</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  filterSorter: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 7,
    paddingHorizontal: 10,
    alignItems: "center",
    borderRadius: 6,
    borderColor: COLORS.mainBlue,
    borderWidth: 0.5,
    elevation: 1,
    shadowColor: COLORS.gray,
    shadowRadius: 0.5,
    shadowOffset: { height: 1, width: 1 },
  },
  filterSorterContainer: {
    flexDirection: "row",
  },
  icon: {
    marginRight: 3,
    color: COLORS.gray,
  },
  textMain: {
    color: COLORS.gray,
    fontWeight: "700",
  },
  empty: {
    fontSize: 14,
    color: COLORS.gray,
    elevation: 1,
    lineHeight: 25,
    textAlign: "center",
    marginTop: 5,
  },
  emptyCont: {
    backgroundColor: "white",
    marginTop: 10,
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});

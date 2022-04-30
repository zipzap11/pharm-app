import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Header from "../components/Search/Header";
import Wrapper from "../components/Wrapper";
import Card from "../components/Search/Card";
import Separator from "../components/Separator";
import { COLORS } from "../assets/design";
import { Dialog } from "@rneui/themed";
import { useState } from "react";
import FilterModal from "../components/Search/FilterModal";

const categories = [
  "Batuk & Flu",
  "Demam",
  "Jantung",
  "Herbal",
  "Mulut & Tenggorokan",
  "P3K",
  "Minyak",
  "Hewan",
];

export default function Search({ navigation, route }) {
  const [modalFilterVisible, setModalFilterVisible] = useState(false);
  const handleBack = () => {
    navigation.goBack();
  };
  const toggleModalFilter = () => {
    setModalFilterVisible(!modalFilterVisible);
  };

  return (
    <>
      <Header onBack={handleBack} />
      <FilterModal
        title={"Pilih Kategori"}
        data={categories}
        isVisible={modalFilterVisible}
        toggleModal={toggleModalFilter}
      />
      <Wrapper>
        <View style={styles.filterSorterContainer}>
          <Filterer onPress={toggleModalFilter} />
          <Separator horizontal={true} size={7} />
          <Sorter text={"Harga Tertinggi"} />
          <Separator horizontal={true} size={7} />
          <Sorter text={"Harga Terendah"} />
        </View>
        <Separator size={10} />
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          renderItem={({ item }) => <Card />}
          keyExtractor={(item) => item}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        />
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
});

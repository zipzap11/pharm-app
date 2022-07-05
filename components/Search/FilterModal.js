import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Dialog } from "@rneui/themed";
import { COLORS } from "../../assets/design";
import { useEffect, useState } from "react";
import { showToast } from "../../screens/util";
import axios from "axios";
import { API_BASE_URL } from "../../config";

export default function FilterModal({ toggleModal, isVisible, title, data, onPick }) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/categories`)
      .then((res) => {
        setCategories(res.data.data);
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false)
        showToast("gagal mengambil data kategori")
      });
  }, []);

  return (
    <Dialog onBackdropPress={toggleModal} isVisible={isVisible}>
      <Dialog.Title title={title} titleStyle={styles.title} />
      {loading ? <ActivityIndicator animating={true} size='large' color={COLORS.mainBlue} /> : <View style={styles.categoriesContainer}>
        {categories.map((item) => (
          <Item onPress={() => onPick(item.id)} key={item.id} text={item.name} />
        ))}
      </View>}
      <Dialog.Actions>
        <Dialog.Button title={"Cancel"} onPress={toggleModal} />
      </Dialog.Actions>
    </Dialog>
  );
}

const Item = ({ text, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={styles.txt}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    borderWidth: 0.5,
    borderColor: COLORS.gray,
    alignSelf: "flex-start",
    padding: 5,
    paddingHorizontal: 7,
    borderRadius: 5,
    marginBottom: 7,
    marginRight: 5,
  },
  txt: {
    color: COLORS.gray,
    fontSize: 16,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  title: { fontWeight: "600", fontSize: 20 },
});

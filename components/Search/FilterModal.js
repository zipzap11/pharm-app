import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Dialog } from "@rneui/themed";
import { COLORS } from "../../assets/design";

export default function FilterModal({ toggleModal, isVisible, title, data }) {
  return (
    <Dialog onBackdropPress={toggleModal} isVisible={isVisible}>
      <Dialog.Title title={title} titleStyle={styles.title} />
      <View style={styles.categoriesContainer}>
        {data.map((item) => (
          <Item key={item} text={item} />
        ))}
      </View>
      <Dialog.Actions>
        <Dialog.Button title={"Cancel"} onPress={toggleModal} />
      </Dialog.Actions>
    </Dialog>
  );
}

const Item = ({ text }) => (
  <TouchableOpacity style={styles.item}>
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

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  categoriesItemContainer: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  categoriesBackground: {
    width: "100%",
    height: "100%",
  },
  categoriesPhoto: {
    width: "100%",
    height: 200,
    borderRadius: 30,
    // borderBottomLeftRadius: 0,
    // borderBottomRightRadius: 0,
  },
  categoriesNameView: {
    position: "absolute",
    top: "40%",
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesName: {
    flex: 1,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  categoriesInfo: {
    marginTop: 3,
    marginBottom: 5,
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default styles;

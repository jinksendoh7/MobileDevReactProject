import { StyleSheet } from 'react-native';
// item size
const RECIPE_ITEM_HEIGHT = 100;
const RECIPE_ITEM_OFFSET = 10;
const RECIPE_ITEM_MARGIN = RECIPE_ITEM_OFFSET * 2;

const styles = StyleSheet.create({
container: {
    flex: 1,
    //backgroundColor: "#fff",
     margin: RECIPE_ITEM_OFFSET,
  },
  controlContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: RECIPE_ITEM_MARGIN,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: RECIPE_ITEM_MARGIN,
    padding: 20,
    //width: "100%",
    borderRadius: 60,
    borderColor: '#FFEE93',
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: '#EF8D32'
  },

  title: {
    margin: RECIPE_ITEM_MARGIN,
    color: '#AA2B1D',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: "bold"
  },
});

export default styles;

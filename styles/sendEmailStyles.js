import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonEmail: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 100,
    elevation: 3,
    backgroundColor: "#EF8D32",
    margin: 5,
  },
  labelemail: {
    fontSize: 15,
    textAlign: "left",
    fontWeight: "bold",
  },
  form:{    
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    width: "80%",
    height: "60%"
  },
   text: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: "#fff",
  },
  textInput:{
    borderColor: '#BECA5C',
    borderWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
    textAlignVertical: 'top',
    width: "100%",
    color: "#454d32"
  },
  messageText: {
    letterSpacing: 2,
    flex: 1,
    textAlign: "left",
    borderColor: '#BECA5C',
    borderWidth: 1,
    borderStyle: 'solid',
  paddingTop: 20,
  height: "50%"
  },
  buttonContainerSmsScreen: {
    justifyContent: "space-between",
    width: "80%",
    marginBottom: '50%'
  },

});

export default styles;

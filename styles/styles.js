import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    // backgroundColor: "#FFEE93",
    alignItems: "center",
    justifyContent: "center",
  },
  sharedContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
   height: 750
  },
  imgContainer: {
    flex: 0.35,
    backgroundColor: "#FFEE93",
    justifyContent: "center",
    width: "100%",
 
  },
  image: {
    flex: 1,
    justifyContent: "center",
    height: "100%"
  },
  logText: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "#454d32",
    width: "100%",
  },
  logSubText: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    color: "#454d32",
    width: "100%",
    marginBottom: 10,
  },
  logBotSubText: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    color: "#454d32",
    width: "100%",
    marginBottom: 80,
  },
  label: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: "center",
    fontStyle: "italic",
    width: "80%"
  },
    imgHome: {
    width: "65%",
    height: "24%",
    marginBottom: 10,
    marginTop: 120,
  },
   img: {
    width: "100%",
    marginBottom: 0,
  },
    text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: "#fff",
  },
    form:{    
    fontSize: 18,
    textAlign: 'center',
    width: "80%",
    paddingTop: 10,
    marginBottom: 20
  },
  textInputContainer:{
    borderColor: '#AA2B1D',
    borderWidth: 1,
    marginBottom: 20,
    textAlignVertical: 'top',
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputField: {
    width: '90%',
    color: "#222",
    fontSize: 15,
    padding: 5,
  },
  buttonContainer: {
    justifyContent: "space-between",
    width: "80%",
    flexDirection: 'row',
  },
  buttonLog: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: "#AA2B1D",
    borderColor: "#BECA5C",
    borderWidth: 2,
    marginBottom: 150,
    borderRadius: 50,
    margin: 5,
    width: '50%',
  },
    buttonShared: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: "#EF8D32",
    marginBottom: 30,
    borderRadius: 50,
    margin: 5,
    width: '50%',
  },
  inputContainer: {
    width: '100%',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#d7d7d7'
  },
});

export default styles;

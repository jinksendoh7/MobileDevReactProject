import { StyleSheet, Dimensions } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    //marginBottom: 0
  },
  carouselContainer: {
    minHeight: 250
  },
  carousel: {},

  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 250
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    width: viewportWidth,
    height: 250
  },
  paginationContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    paddingVertical: 8,
    marginTop: 200
  },
  paginationDot: {
    width: 12,
    height: 12,
    borderRadius: 4,
    marginHorizontal: 0
  },
  infoContainer: {
    //flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    left: "2%",
  marginTop: "2%",
  marginBottom: "2%"
  },
  
  infoAdd: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#AA2B1D",
    padding: 10,
    //backgroundColor: "#BECA5C"
  },
 
  text: {
    fontSize: 25,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: "#EF8D32",
  },
  imgContainer: {
   //width: "100%",
    height: 100,
  },
  img: {
    width: "65%",
    height: "100%",
        left: "15%",
        right:"20%",
  },
   title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444444',
    marginTop: 10,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 10,
    padding: 10
  },
   weDo: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#BECA5C',
    marginTop: 20,
    // backgroundColor: "#BECA5C",
    // orderColor: '#EF8D32',
    // borderRadius: 20,
    // padding: 10,
    // width: "50%"
  },
   offering: {
    flex: 1,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#AA2B1D',
    marginTop: 20,
    //   borderColor: '#EF8D32',
    // borderWidth: 2,
    borderBottomColor: '#EF8D32',
    borderBottomWidth: 2,
    borderStyle: "dashed",
    borderTopColor: '#EF8D32',
    borderTopWidth: 2,
    padding: 10
  },
});

export default styles;

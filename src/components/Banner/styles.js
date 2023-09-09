import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: '100%',
    height: 130,
    marginTop: 20,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 24,
  },

  banner: {
    flex: 1,
    backgroundColor: 'rgba(37,36,50,0.4)',
    borderRadius: 6,
    justifyContent: "space-between",
    padding: 6,
  },

  containerLeft: {
    width: '80%',
    height: '100%',
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10
  },

  titleBanner: {
    fontSize: 18,
    fontWeight: "500",
    color: '#FFF',
    textTransform: 'uppercase',
    fontFamily: 'DroidSans'
  }
});

export default styles;
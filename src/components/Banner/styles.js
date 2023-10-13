import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: '100%',
    height: 100,
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
    fontSize: 16,
    fontWeight: "500",
    color: '#FFF',
    textTransform: 'uppercase',
    fontFamily: 'DroidSans'
  }
});

export default styles;
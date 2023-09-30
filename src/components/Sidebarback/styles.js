import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: '100%',
    height: 42,
    marginTop: 40,
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: 'row',
    borderBottomColor: 'rgba(58,58,71,0.5)',
    borderBottomWidth: 1
  },

  title: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'DroidSans'
  },

  iconRight: {
    display: "flex",
    flexDirection: "row",
    width: 60,
    justifyContent: 'space-between'
  },
  containerCoin: {
    display: 'flex',
    flexDirection: 'row',
  },
  containerSvg: {
    display: 'flex',
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
  },
});

export default styles;
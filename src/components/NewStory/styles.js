import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1, flexDirection: 'row', margin: 1,
    justifyContent: 'center',
    marginVertical: 10

  },
  containerStoryLeft: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '70%'
  },
  containerStoryRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '20%'
  },
  txtTimeAgo: {
    marginLeft: 4,
    color: '#C5C5C5',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 10
  },
  txtTitle: {
    color: '#FFF',
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: 14
  },
  logoNull: {
    width: 16,
    height: 16,
    borderRadius: 2,
    backgroundColor: '#F2F2F2',
    display: 'flex',
    alignItems: 'flex-start',
  }
});

export default styles;
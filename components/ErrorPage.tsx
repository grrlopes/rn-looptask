import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface Props {
  message: string
}

const ErrorPage = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.square}>
        <View style={styles.msgtext}>
          <Text>{props.message}</Text>
        </View>
      </View>
    </View>
  )
}

export default ErrorPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#E0E0E0",
  },
  square: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
    borderWidth: 0.2,
    height: 100,
    alignSelf: "center",
    alignItems: "center",
  },
  msgtext: {
    flex: 1,
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center"
  }

})

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "../../";

const Readmore = (props) => {
  return (
    // <TouchableOpacity onPress={() => props.onReadMore()} style={styles.readMoreWrapper}>
    //   <View style={styles.readMore}>
    //     <Icon.MaterialCommunityIcons name="chevron-up" size={20} color="white" />
    //   </View>
    //   <Text style={styles.readText}>{props.title ? props.title : "Read more"}</Text>
    // </TouchableOpacity>
    <TouchableOpacity onPress={() => props.onReadMore()} style={styles.readMoreWrapper}>
    <View style={styles.readMore}>
      <Icon.FontAwesome name="trash-o" color="black" size={20} color="white" />
    </View>
    <Text style={styles.readText}>{props.title ? props.title : "Delete"}</Text>
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  readMore: {
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 2,
  },
  readText: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
  },
  readMoreWrapper: {
    position: "absolute",
    bottom: 25,
    width: "98%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default Readmore;
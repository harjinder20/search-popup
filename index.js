import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  Text,
  TextInput,
  Modal,
  VirtualizedList,
} from "react-native";
const SearchPopup = ({
  showPopup,
  setShowPopup,
  setItem,
  setItemKey,
  SelectedItem,
  data,
  label,
  Key,
  selectedItemBackgroundColor,
  headingText,
  textInputProps,
  style,
}) => {
  const [input, setInput] = useState("");
  const [arr, setArr] = useState(data);
  const [andarValiItem, setAndarValiItem] = useState();
  const tempArr = useRef([]);
  const listRef = useRef();
  let listItemHeight =
    style?.listItemContainer?.height &&
    typeof style?.listItemContainer?.height == "number"
      ? style.listItemContainer.height
      : styles.listItemContainer.height;

  useEffect(() => {
    suggest(input);
  }, [input]);

  useEffect(() => {
    if (showPopup && listRef.current) {
      try {
        listRef.current.scrollToItem({ item: andarValiItem });
      } catch (e) {}
    }
  }, [showPopup]);

  function suggest(value) {
    l = value.length;
    if (l == 0) {
      tempArr.current = data;
    } else {
      tempArr.current = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].value.toLowerCase().indexOf(value.toLowerCase()) > -1) {
          tempArr.current = [...tempArr.current, data[i]];
        }
      }
    }
    setArr(tempArr.current);
  }

  const listItem = ({ item, index }) => (
    <Pressable
      style={[
        style?.listItemContainer
          ? style.listItemContainer
          : styles.listItemContainer,
        {
          backgroundColor:
            item[label] == SelectedItem
              ? selectedItemBackgroundColor
                ? selectedItemBackgroundColor
                : "#999"
              : null,
          marginVertical: 0,
        },
        typeof style?.listItemContainer?.height != "number"
          ? { height: styles.listItemContainer.height }
          : null,
      ]}
      onPress={() => {
        setAndarValiItem(item);
        setItem(item[label]);
        setItemKey ? setItemKey(item[Key]) : null;
        setInput("");
        setShowPopup(false);
      }}
    >
      <Text
        style={
          item[label] == SelectedItem
            ? style?.selectedListItemText
              ? style.selectedListItemText
              : styles.selectedListItemText
            : style?.listItemText
            ? style.listItemText
            : styles.listItemText
        }
      >
        {item[label]}
      </Text>
    </Pressable>
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showPopup}
      onRequestClose={() => {
        setInput("");
        setShowPopup(false);
      }}
    >
      <Pressable
        style={style?.mainView ? style.mainView : styles.mainView}
        onPress={() => {
          setInput("");
          setShowPopup(false);
        }}
      >
        <View style={style?.popup ? style.popup : styles.innerContainer}>
          <View
            style={
              style?.headingContainer
                ? style.headingContainer
                : styles.headingContainer
            }
          >
            <Text
              style={
                style?.headingTextStyle
                  ? style.headingTextStyle
                  : styles.headingTextStyle
              }
            >
              {headingText ? headingText : "Select Data"}
            </Text>
          </View>
          <TextInput
            style={style?.searchInput ? style.searchInput : styles.searchInput}
            placeholder={"Search"}
            placeholderTextColor={"#989898"}
            underlineColorAndroid="transparent"
            value={input}
            onChangeText={(text) => setInput(text)}
            {...textInputProps}
          />
          <VirtualizedList
            ref={listRef}
            keyboardDismissMode={"on-drag"}
            keyboardShouldPersistTaps={"handled"}
            data={arr}
            initialNumToRender={25}
            renderItem={(item, index) => listItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
            getItemCount={() => (arr !== null ? parseInt(arr?.length) : 0)}
            style={style?.list ? style.list : styles.list}
            getItem={(data, index) => data[index]}
            showsVerticalScrollIndicator={false}
            onScrollToIndexFailed={() => {}}
            getItemLayout={(data, index) => ({
              length: listItemHeight,
              offset: listItemHeight * index,
              index,
            })}
            contentContainerStyle={{
              paddingBottom: 40,
            }}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

export default SearchPopup;

const styles = StyleSheet.create({
  headingContainer: {
    height: Dimensions.get("window").height * 0.05,
  },
  headingTextStyle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "700",
  },
  innerContainer: {
    width: "95%",
    borderRadius: 5,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "4%",
    paddingHorizontal: "2%",
    height: "98%",
  },
  list: {
    width: "100%",
    paddingTop: 10,
  },
  listItemContainer: {
    height: Dimensions.get("window").height * 0.07,
    justifyContent: "center",
    paddingHorizontal: "8%",
    borderRadius: 5,
  },
  listItemText: {
    color: "#000",
    fontSize: 15,
  },
  mainView: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, .6)",
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {
    color: "#000",
    marginHorizontal: "5%",
    backgroundColor: "oldlace",
    width: "100%",
    borderRadius: 5,
    borderColor: "#000",
    borderWidth: 1,
  },
  selectedListItemText: {
    color: "#fff",
    fontSize: 18,
  },
});

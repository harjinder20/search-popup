# search-popup
A React Native search popup component easy to customize for both iOS and Android.

## Features
* searchable popup with customisable props
* Easy to use
* Consistent look and feel on iOS and Android
* Customizable font size, colors

## Getting started
```js
    npm install search-popup --save
```
or

```js
    yarn add search-popup
```
#### Demo
![](https://github.com/harjinder20/assets/blob/a2e8ca06ce4a39caf03e3721b682274fc85b5662/search-popup(GIF).gif)

#### SearchPopup Props
| Props              | Params                                          | Required | Description                                                         |
| ------------------ | ----------------------------------------------- | --------- | ------------------------------------------------------------------- |
| showPopup          | boolean                                         | Yes       | condition which makes popup hide or show                            |
| setShowPopup       | function to update showPopup state              | Yes       | function to update showPopup state                                  |
| data               | Array                                           | Yes       | Data is a plain array                                               |
| label              | String                                          | Yes       | Extract the label from the data item                                |
| Key                | String                                          | Yes       | Extract the primary key from the data item                          |
| selectedItem       | Item                                            | Yes       | Selected value                                                      |
| setItem            | function                                        | Yes       | function to set item from list                                      |
| style              | Style object                                    | No        | Styling object for popup                                            |
| headingText        | String                                          | No        | Text shown at top of the popup as heading                           |
| textInputProps     | props object                                    | No        | props accepted by react native textInput can be given in this object|
| itemBackgroundColor| Valid colour                            | No        | background color of the list item                     |
| selectedItemBackgroundColor| Valid colour                            | No        | background color of the selected item from list                     |

## Style Prop Structure
### headingContainer
Applies styling to heading View.
### headingTextStyle
Applies styling to heading Text.
### popup
Applies styling to Popup View.
### list
Applies styling to list component.
### listItemContainer
Applies styling to individual list Item View. <br/>**(NOTE: height given to this view will only have effect if it is provided in *number*)**
### listItemText
Applies styling to individual list Item Text.
### mainView
Applies styling to main Popup View.
### searchInput
Applies styling to search text input.
### selectedListItemText
Applies styling to selected List item View.


### SearchPopup example
![](https://github.com/harjinder20/assets/blob/a2e8ca06ce4a39caf03e3721b682274fc85b5662/search-popup.jpg)
```js
  import React, {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
} from 'react-native';
import SearchPopup from './src/components/Search_Popup';

function App(): JSX.Element {
  const [show, setShow] = useState(true);
  const [item, setItem] = useState(countries[0].value);
  const [itemKey, setItemKey] = useState(countries[0].key);
  
  const data = [
    { value: 'Item 1', Key: '1' },
    { value: 'Item 2', Key: '2' },
    { value: 'Item 3', Key: '3' },
    { value: 'Item 4', Key: '4' },
    { value: 'Item 5', Key: '5' },
    { value: 'Item 6', Key: '6' },
    { value: 'Item 7', Key: '7' },
    { value: 'Item 8', Key: '8' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <SearchPopup
        showPopup={show}
        setShowPopup={setShow}
        setItem={setItem}
        SelectedItem={item}
        data={data}
        label={'value'}
        Key={'key'}
        itemBackgroundColor={'#fff'}
        selectedItemBackgroundColor={'#bbb'}
        headingText={'Select Item'}
        textInputProps={{
          placeholder: 'Search',
          placeholderTextColor: 'red',
        }}
        style={{
          headingContainer: {
            height: Dimensions.get('window').height * 0.05,
          },
          headingTextStyle: {
            color: '#000',
            fontSize: 18,
            fontWeight: '700',
          },
          popup: {
            height: '92%',
            width: '88%',
            borderRadius: 5,
            backgroundColor: 'floralwhite',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '4%',
            paddingHorizontal: '2%',
          },
          list: {
            width: '100%',
            paddingTop: 10,
            backgroundColor: 'pink',
            paddingBottom: '20%',
          },
          listItemContainer: {
            height: Dimensions.get('window').height * 0.07,
            justifyContent: 'center',
            paddingHorizontal: '8%',
            borderRadius: 5,
          },
          listItemText: {
            color: '#000',
            fontSize: 15,
          },
          mainView: {
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, .6)',
            alignItems: 'center',
            justifyContent: 'center',
          },
          searchInput: {
            color: '#000',
            marginHorizontal: '5%',
            backgroundColor: 'cornsilk',
            width: '100%',
            borderRadius: 5,
            borderColor: '#000',
            borderWidth: 1,
          },
          selectedListItemText: {
            color: '#fff',
            fontSize: 18,
          },
        }}
      />
      <Pressable
        style={{
          alignSelf: 'center',
          height: 45,
          minWidth: 200,
          paddingHorizontal: 15,
          backgroundColor: 'mistyrose',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
        }}
        onPress={() => setShow(true)}>
        <Text style={{color: '#000'}}>{item}</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'azure',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;

```

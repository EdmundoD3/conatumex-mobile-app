import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

const CustomTextInput = ({ label, value, onChangeText,onClearText, ...props }) => {
  return (
    <View style={styles.container}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        mode="outlined"
        {...props}
        right={<TextInput.Icon icon="close" onPress={onClearText} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    backgroundColor: 'white',
  },

});

export default CustomTextInput;
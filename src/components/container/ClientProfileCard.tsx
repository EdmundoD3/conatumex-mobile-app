import React from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";

import Svg, { Path } from "react-native-svg";
import { TextParagraph, TextTitle } from "@ui/texts/TextComponents";
import {
  AnimatedContainer,
  ViewContainer,
  ViewSubContainer,
} from "../ui/Container/ContainerComponents";
import { useThemeColor } from "@/hooks/useThemeColor";
import TablePaid from "@/components/container/PaidTables";

const data = [
  {
    id: "1",
    date: "2/14/2016",
    recipe: "46565164",
    abono: "700",
    saldo: "150",
  },
  {
    id: "2",
    date: "2/14/2016",
    recipe: "46565164",
    abono: "700",
    saldo: "150",
  },
  {
    id: "3",
    date: "2/14/2016",
    recipe: "46565164",
    abono: "700",
    saldo: "150",
  },
];

const saldo = 100000

const TextPhone = () => (
  <TextParagraph style={styles.detail}>📞 +123-458-784</TextParagraph>
);
const TextEmail = () => (
  <TextParagraph style={styles.detail}>📧 smkys@gmail.com</TextParagraph>
);
const TextDirection = ({
  direccion = "456 Anytown, Near Anywhere, ST 47523",
  entCall = "entre calles",
  colonia = "colonia",
  ciudad = "ciudad",
}) => {
  return (
    <View style={{ flexDirection: "column" }}>
      {/* <Paragraph style={styles.detail}>Direccion:</Paragraph> */}
      <TextParagraph style={styles.detail}>Domicilio: {direccion}</TextParagraph>
      <TextParagraph style={styles.detail}>Colonia: {colonia}</TextParagraph>
      <TextParagraph style={styles.detail}>Entre calles: {entCall}</TextParagraph>
      <TextParagraph style={styles.detail}>Ciudad: {ciudad}</TextParagraph>
    </View>
  );
};

export default function ClientProfileCard({client}) {
  const scaleValue = new Animated.Value(1);
  const { colors } = useThemeColor();
  const {name, direction} = client

  // const handlePressIn = () => {
  //   Animated.spring(scaleValue, {
  //     toValue: 0.95,
  //     useNativeDriver: true,
  //   }).start();
  // };

  // const handlePressOut = () => {
  //   Animated.spring(scaleValue, {
  //     toValue: 1,
  //     useNativeDriver: true,
  //   }).start();
  // };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  return (
    <View
      // activeOpacity={0.9}
      // onPressIn={handlePressIn}
      // onPressOut={handlePressOut}
    >
      <AnimatedContainer
        style={[{ ...styles.card, shadowColor: colors.text }, animatedStyle]}
      >
        {/* <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.avatar}
          />
        </View> */}

        <View style={styles.infoContainer}>
          <TextTitle style={styles.name}>{name}</TextTitle>
          {/* <Text style={styles.role}>DEVELOPER</Text> */}
          <TextDirection {...direction}/>
          <TextPhone />
          <TextEmail />
        </View>

        {/* <View style={styles.detailsContainer}></View> */}
        <TablePaid saldo={saldo} data={data} />
      </AnimatedContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 10,
    // shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    padding: 18,
    margin: "auto",
    alignItems: "flex-start",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#58b0e0",
  },
  infoContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    // color: "#434955",
  },
  role: {
    fontSize: 16,
    fontWeight: "500",
    // color: "#434955",
  },
  detailsContainer: {
    marginTop: 10,
    width: "100%",
  },
  detail: {
    fontSize: 14,
    marginBottom: 5,
  },
});

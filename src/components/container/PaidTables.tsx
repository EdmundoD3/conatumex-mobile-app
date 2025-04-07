import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ViewProps,
} from "react-native";
import { TextParagraph } from "@ui/texts/TextComponents";
import { ViewRow } from "@ui/Container/ContainerComponents";
import { OutlineButton } from "../ui/Buttons/CustomButtons";
import { ModalContainer } from "../ui/Container/ModalContainer";
import PaidForm from "./PaidForm";

type TPages = {
  id: string;
  date: string;
  recipe: string;
  abono: string;
  // saldo: string;
};

type TTablePaid = ViewProps & { data: TPages[] | []; saldo: string | number };

const TablePaid = ({
  style,
  data,
  saldo = "pendiente",
  ...props
}: TTablePaid) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const styleTextTable = [styles.cell, styles.headerText];
  return (
    <View style={[styles.container, style]} {...props}>
      <OutlineButton
        style={styles.row}
        onPress={() => setModalVisible(true)}
        title="Agregar Pago"
      />

      {/* Encabezado */}
      <ViewRow style={styles.header}>
        <TextParagraph style={styleTextTable}>
          Saldo:{" " + saldo}
        </TextParagraph>
      </ViewRow>
      <ViewRow style={styles.header}>
        <TextParagraph style={styleTextTable}>FECHA</TextParagraph>
        <TextParagraph style={styleTextTable}>RECIBO</TextParagraph>
        <TextParagraph style={styleTextTable}>ABONO</TextParagraph>
      </ViewRow>

      {/* Filas de datos */}
      {data.map(({ date, recipe, abono }, index) => (
        <ViewRow key={index}>
          <TextParagraph style={styles.cell}>{date}</TextParagraph>
          <TextParagraph style={styles.cell}>{recipe}</TextParagraph>
          <TextParagraph style={styles.cell}>{abono}</TextParagraph>
        </ViewRow>
      ))}

      <ModalContainer
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
      >
        <PaidForm></PaidForm>
      </ModalContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // textAlign:"center",
    margin: "auto",
    width: "100%",
    // borderRadius: 1,
    padding: 1,
    paddingBottom: 6,
    gap:4,
    // overflow: "hidden",
    // backgroundColor: "#fff",
    // elevation: 4, // Sombra para Android
    // shadowColor: "#ccc", // Sombra para iOS
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
  },
  header: {
    // backgroundColor: "#4CAF50",
    // borderRightWidth: 0,
    // boxShadow:,
  },
  headerText: {
    // color: "white",
    fontWeight: "bold",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    padding: 6,
    // borderRadius:5,
  },
  row: {
    marginBottom: 3,
  },
});

export default TablePaid;

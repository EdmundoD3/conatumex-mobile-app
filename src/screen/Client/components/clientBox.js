import * as React from "react";
import { Card, Text } from "react-native-paper";
function ClientBox({ name, street, colonia, nextPayment }) {
  return (
    <Card>
      <Card.Content>
        <Text variant="titleLarge">{name}</Text>
        <Text variant="bodyMedium">{street}</Text>
        <Text variant="bodyMedium">{colonia}</Text>
        <Text variant="bodyMedium">{nextPayment.toString()}</Text>
      </Card.Content>
    </Card>
  );
}
export default ClientBox
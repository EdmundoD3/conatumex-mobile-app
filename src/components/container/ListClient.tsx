import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { DateText }  from "@/src/components/ui/texts/ListClientText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TextParagraph } from "@/src/components/ui/texts/TextComponents";
export type TListClient = {
  id: string;
  name: string;
  direction: string;
  date: Date;
};

const URL = "./";
const formattedDate = (date: Date) =>
  date.toLocaleDateString("en-GB").slice(0, 8);
const today = new Date();
function isSameDay(date1: Date, date2: Date): boolean {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  return (
    date1.toLocaleDateString(undefined, options) ===
    date2.toLocaleDateString(undefined, options)
  );
}
export default function ListClient({ id, name, direction, date }: TListClient) {
  const { colors } = useThemeColor();

  const colorSaved = {
    wave: "#04e4003a",
    circleContainer: "#04e40048",
    circleLine: "#269b24",
  };
  let color: string;
  if (date < today) {
    //red
    color = "#e4003a7a"; // Fecha pasada
  } else if (isSameDay(date, today)) {
    //blue
    color = "#009ece7a"; // Hoy
  } else {
    //green
    color = "#04e4007a"; // Fecha futura
  }
  const handlePress = () => {
    // Linking.openURL(URL);
  };
  return (
    <TouchableOpacity
      style={{ ...styles.card, backgroundColor: colors.card, boxShadow: `0px 8px 8px #737373`  }}
      onPress={handlePress}
    >
      {/* Wave SVG */}
      <Svg style={styles.wave} viewBox="0 0 1440 320">
        <Path
          d="M0,256L11.4,240C22.9,224,46,192,69,192C91.4,192,114,224,137,234.7C160,245,183,235,206,213.3C228.6,192,251,160,274,149.3C297.1,139,320,149,343,181.3C365.7,213,389,267,411,282.7C434.3,299,457,277,480,250.7C502.9,224,526,192,549,181.3C571.4,171,594,181,617,208C640,235,663,277,686,256C708.6,235,731,149,754,122.7C777.1,96,800,128,823,165.3C845.7,203,869,245,891,224C914.3,203,937,117,960,112C982.9,107,1006,181,1029,197.3C1051.4,213,1074,171,1097,144C1120,117,1143,107,1166,133.3C1188.6,160,1211,224,1234,218.7C1257.1,213,1280,139,1303,133.3C1325.7,128,1349,192,1371,192C1394.3,192,1417,128,1429,96L1440,64L1440,320L1428.6,320C1417.1,320,1394,320,1371,320C1348.6,320,1326,320,1303,320C1280,320,1257,320,1234,320C1211.4,320,1189,320,1166,320C1142.9,320,1120,320,1097,320C1074.3,320,1051,320,1029,320C1005.7,320,983,320,960,320C937.1,320,914,320,891,320C868.6,320,846,320,823,320C800,320,777,320,754,320C731.4,320,709,320,686,320C662.9,320,640,320,617,320C594.3,320,571,320,549,320C525.7,320,503,320,480,320C457.1,320,434,320,411,320C388.6,320,366,320,343,320C320,320,297,320,274,320C251.4,320,229,320,206,320C182.9,320,160,320,137,320C114.3,320,91,320,69,320C45.7,320,23,320,11,320L0,320Z"
          fill={color}
        />
      </Svg>

      {/* Icon Container */}
      {/* <View style={styles.iconContainer}>
        <Svg style={styles.icon} viewBox="0 0 512 512">
          <Path
            fill="currentColor"
            d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
          />
        </Svg>
      </View> */}

      {/* Message Text */}
      <View style={styles.messageTextContainer}>
        <TextParagraph style={styles.nameText}>{name}</TextParagraph>
        <TextParagraph style={styles.subText}>{direction}</TextParagraph>
        <DateText style={styles.subText}>{String(date)}</DateText>
      </View>

      {/* Arrow Icon */}
      <View>
        <Svg viewBox="0 0 299 511.517" style={styles.crossIcon}>
          <Path
            d="M12.579 75.262C-24.314 10.56 28.16-20.832 64.505 15.117L273.92 215.793c33.44 33.44 33.44 46.491 0 79.93L64.505 496.4c-36.345 35.949-88.819 4.557-51.926-60.146l97.261-180.496L12.579 75.262z"
            fill={color} 
          />
        </Svg>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 80,
    borderRadius: 8,
    padding: 10,
    // paddingLeft:15,
    // backgroundColor: "#ffffff",
    // boxShadow: "0px 8px 24px",
    // shadowColor: "rgba(149, 157, 165, 0.2)",
    position: "relative",
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 15,
  },
  wave: {
    position: "absolute",
    transform: [{ rotate: "90deg" }],
    left: -31,
    top: 32,
    width: 80,
    height: 80,
  },
  iconContainer: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#04e40048",
    borderRadius: 50,
    marginLeft: 8,
  },
  icon: {
    width: 17,
    height: 17,
    color: "#269b24",
  },
  messageTextContainer: {
    flexDirection: "column",
    flexGrow: 1,
  },
  nameText: {
    // color: "#4f5054",
    fontSize: 17,
    fontWeight: "700",
    textTransform: "capitalize",
    // color: #47484b;
  },
  subText: {
    fontSize: 16,
    fontWeight: 600,
    textTransform: "capitalize",
    // color: "#5f6064",
  },
  crossIcon: {
    width: 18,
    height: 18,
    color: "#555",
  },
});

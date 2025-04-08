import {
  TextBold,
  TextParagraph,
  TextTitle,
} from "@ui/texts/TextComponents";
import { useState } from "react";
import { TouchableOpacity } from "react-native";


export const FakeConsole = ({ data }: { data: string }) => {
  const [isShow, setIsShow] = useState(false);
  const handleShow = () => setIsShow((e) => !e);
  console.log(data);
  return (
    <TouchableOpacity onPress={handleShow}>
      <TextTitle>Consola:</TextTitle>
      <TextParagraph>
        {(isShow ? data : data.substring(0, 30) + "...") + "\n"}
        <TextBold>
          {isShow ? "push to hidden" : "push to show more..."}
        </TextBold>
      </TextParagraph>
    </TouchableOpacity>
  );
};
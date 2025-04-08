import {
  fetchActualizeData,
} from "@services/api/cobranza/actualize-data";
import { ActualizeCobradorDataRequest, Payments } from "@services/api/models/ActualizeCobradorRequest";
import { DebugLoging } from "@/components/screen/debug/debugFetchLogin";
import { SecondaryButton } from "@ui/Buttons/CustomButtons";
import { Collapsible } from "@ui/Container/Collapsible";
import { ScrollContainer } from "@ui/Container/ContainerComponents";
import { FakeConsole } from "@ui/Container/FakeConsole";
import { TextTitle } from "@ui/texts/TextComponents";
import { useState } from "react";

const payment = new Payments({amount:5000,date: new Date(),receiptId:"asgfaklsfgi"})
const actualizeCobradorData = new ActualizeCobradorDataRequest("658d1607ea35e3cae1df0344", [payment]);

function DebugRefreshData({ consoleFake }: { consoleFake: Function }) {
  const handleFetchActualizeData = async () => {
    try {
      const date = new Date("2020-03-10T21:50:28.308Z")
      const data = await fetchActualizeData([actualizeCobradorData], date);
      consoleFake(data);
    } catch (error) {
      console.log({error});
      consoleFake(error);
    }
  };
  return (
    <Collapsible title="Refresh Data">
      <TextTitle>Refresh Clients</TextTitle>
      <SecondaryButton title="RefreshClients" onPress={handleFetchActualizeData} />
    </Collapsible>
  );
}

export default function DebugFetch() {
  const [refreshToken, setRefreshToken] = useState("");
  const [fakeConsole, setFakeConsole] = useState<string>("Nothing yet");
  const consoleFake = (data: string | object) => {
    if (typeof data === "string" || typeof data === "number") {
      return setFakeConsole(data);
    }
    return setFakeConsole(JSON.stringify(data));
  };

  return (
    <ScrollContainer>
      <FakeConsole data={fakeConsole} />
      <DebugLoging {...{ consoleFake, refreshToken, setRefreshToken }} />
      <DebugRefreshData consoleFake={consoleFake} />
    </ScrollContainer>
  );
}

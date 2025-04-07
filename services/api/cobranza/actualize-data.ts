import apiClient from "@services/api/apiClient";
import { apiUrl } from "@/helpers/constants/urls";
import { AdminUserStorage } from "@/database/AdminUserStorage";
import { ActualizeCobradorDataResponse } from "@services/api/models/ActualizeCobradorResponse";
import { ActualizeCobradorDataRequest } from "@services/api/models/ActualizeCobradorRequest";

export const fetchActualizeData = async (actualizeCobradorData:ActualizeCobradorDataRequest[],lastDateUpdate:Date)=>{
  const {token} = await AdminUserStorage.getToken()
  const body = JSON.stringify({lastDateUpdate,data:actualizeCobradorData})
  console.log({body});
  const data = await apiClient(
    apiUrl + "/customer/cobrador/actualize-data",
    {
      method: "POST",
      headers: {
        token
      },
      body
    }
  );
  if (data.data?.dateUpdate) return new ActualizeCobradorDataResponse(data.data)
    throw new Error(data);
}

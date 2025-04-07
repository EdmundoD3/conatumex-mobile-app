import SyncDateHandler from "./helpers/updateDate";
import { AdminUserStorage } from "./AdminUserStorage";
import { CustomerRequestSquema } from "./models/customer";
import { PurchaseRequestSquema } from "./models/purchase";
import { fetchGetAllPurchases } from "@/services/clients";
import db from "./sqlite";
import { DatabaseError, SessionError } from "@error/typeErrors";

const saveInit = async (client = []) => {
  try {
    await Promise.all(
      client.flatMap(({ customer, purchase }) => {
        const newCustomer = new CustomerRequestSquema(customer);
        const newPurchase = new PurchaseRequestSquema({...purchase,customerId:customer.id});
        return [newCustomer.save(), newPurchase.save()];
      })
    );
  } catch (error) {
    throw new DatabaseError(error,"getFirstDatabase.ts, saveInit") 
  }

  console.log("Await")
  console.log(await (await db).getAllAsync("select * from cliente"))
  console.log(await (await db).getAllAsync("select * from address"))
  console.log(await (await db).getAllAsync("select * from colonia"))
  console.log(await (await db).getAllAsync("select * from city"))
};

const fetchInit = async () => {
  const token = await AdminUserStorage.getToken();
  if (!token) throw new SessionError("La session no se pudo iniciar","getFirstDatabase.ts, fetchInit");
  
  const { data } = await fetchGetAllPurchases({ token })
  return data;
};

const startDatabase = async () => {
  try {

    const lastUpdateDate = await SyncDateHandler.getLastUpdateDate();
    if (!lastUpdateDate) {
      const { dateUpdate, client } = await fetchInit();
      // SyncDateHandler.saveLastUpdateDate(new Date(dateUpdate))
      saveInit(client)
    }
  } catch (error) {
    if (error instanceof Error) throw new DatabaseError(error.message,"startDb.ts");
    throw error
  }
};
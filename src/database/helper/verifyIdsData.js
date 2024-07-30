import { DataExistsError } from "../../error/typeErrors";

async function verifyIdsData(dataId, repository) {
  if (!dataId) {
    try {
      await repository.save();
      dataId = (await repository.get()).id;
    } catch (error) {
      throw new DataExistsError(error);
    }
  }
  return dataId;
}

export default verifyIdsData
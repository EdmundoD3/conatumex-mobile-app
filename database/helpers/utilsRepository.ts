export const placeholdersGenerate = ({
  pattern = "(?, ?, ?, ?)",
  count,
}: {
  pattern?: string; //"(?, ?, ?, ?)"
  count: number;
}) => Array(count).fill(pattern).join(", ");

export const generateParams = (dataArr: any[], pushParams: (item: any) => any[]) => {
  const historialParams: any[] = [];

  dataArr.forEach((e) => {
    // Usamos spread operator para aplanar el array
    historialParams.push(...pushParams(e));
  });
  return historialParams;
};
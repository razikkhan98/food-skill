const actionCodes = {
  CCO: "Cancelled",
  RES: "Reserved",
  AVAIL: "Available",
  OCC: "Occupied",
  CMP: "Completed",
};

export const updateTableStatus = (table, actionCode) => {
  table?.status = actionCodes[actionCode];
  if (actionCode === "CCO") table?.currentOrder = null;
return table;
};


/**
 * example
 * */ 
// const table = {
//   tableId: "T4",
//   status: "Occupied",
//   currentOrder: { orderId: "O124" },
// };
// const updatedTable = updateTableStatus(table, "CCO");
// console.log(updatedTable);

// function insert(tableName, json) {
//   const keys = Object.keys(json); //['name','descripti']
//   const values = Object.values(json); //[]
//   const columans = keys.join(" , ");

//   const placeholders = values.map((value) => `"${value}"`).join(" , ");
//   const insertStament = `INSERT INTO ${tableName} (${columans}) VALUES(${placeholders})`;
//   // console.log(insertStament);
//   return insertStament;
// }

function insertAR(tableName, jsonArray) {
  if (!Array.isArray(jsonArray) || jsonArray.length === 0) {
    throw new Error("jsonArray must be a non-empty array.");
  }

  const keys = Object.keys(jsonArray[0]); // Extract keys from the first object
  const columns = keys.join(", "); // Column names joined by commas

  const values = jsonArray.map((json) => {
    const rowValues = keys.map((key) => {
      const value = json[key];
      // Handle different data types (strings, numbers, null, etc.)
      if (typeof value === "string") {
        return `"${value.replace(/"/g, '\\"')}"`; // Escape quotes in strings
      } else if (value === null || value === undefined) {
        return "NULL";
      } else {
        return value; // Numbers and other types
      }
    });
    return `(${rowValues.join(", ")})`; // Wrap values in parentheses
  });

  const insertStatement = `INSERT INTO ${tableName} (${columns}) VALUES ${values.join(
    ", "
  )};`;
  //console.log(insertStatement);
  return insertStatement;
}

module.exports = { insertAR };

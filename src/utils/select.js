//=Select all contents from the table=======================
function all(tableName) {
  return `SELECT * FROM ${tableName}`;
}

// all by merchant
function all_by_merchant(tableName, merchant) {
  return `SELECT * FROM ${tableName} where merchant_id=${merchant}`;
}

//Counts All Records of the table=======================
function selectAllCount(tableName) {
  return `SELECT Count(*) as 'count' FROM ${tableName}`;
}

//===================Select One=============================================
function byID(tableName, ID, value) {
  return `SELECT * FROM ${tableName} where ${ID}=${value}`;
} //================================================================
function selectCTR(tableName, id, KEY) {
  return `SELECT * FROM ${tableName} where ${KEY}=${id}`;
}
//================================================================
function selectCTRString(tableName, id, KEY) {
  return `SELECT * FROM ${tableName} where ${KEY}='${id}'`;
}
//================================================================
function select2key(tableName, key1, id1, key2, id2) {
  return `SELECT * FROM ${tableName} where ${key1}=${id1} and ${key2}=${id2} `;
}
function selectCTRCount(tableName, id, KEY) {
  return `SELECT Count(*) as count FROM ${tableName} where ${KEY}=${id}`;
}

function SELECT_WITH_CRIATERIA(tableName, criteria, connector) {
  let query = `SELECT * FROM ${tableName} WHERE `;
  let conditions = [];
  for (const key in criteria) {
    if (criteria.hasOwnProperty(key)) {
      let value =
        typeof criteria[key] === "string"
          ? `'${criteria[key]}'`
          : criteria[key];
      conditions.push(`${key} = ${value}`);
    }
  }

  // Join the conditions with AND and append to the query
  query += conditions.join(` ${connector} `);
  console.log(query);

  return query;
}

module.exports = {
  all,
  selectCTR,
  selectAllCount,
  selectCTRCount,
  select2key,
  all_by_merchant,
  selectCTRString,
  byID,
  SELECT_WITH_CRIATERIA,
};

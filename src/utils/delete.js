function deleteScript(tableName,json){
    const deleteConditions = Object.entries(json)
  .map(([key, value]) => `${key} = '${value}'`)
  .join(' AND ');
  const deleteScript = `DELETE FROM ${tableName} WHERE ${deleteConditions}`;
    return deleteScript;
}
module.exports={deleteScript}
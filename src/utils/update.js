function update(tableName,json){
    let data =JSON.stringify(json);
    const { fields, criteria } = JSON.parse(data);

    const field_value_pairs = Object.entries(fields).map(([field, value]) => `${field} = '${value}'`);
    const criteria_pairs = Object.entries(criteria).map(([field, value]) => `${field} = '${value}'`);
    const criteria_clause = criteria_pairs.join(' OR ');
    const update_query = `UPDATE ${tableName} SET ${field_value_pairs.join(', ')} WHERE ${criteria_clause};`;
    
    return update_query;
}

module.exports={update}
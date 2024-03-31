const getAllTables = "SELECT * FROM tables ORDER BY id DESC";
const getTableById = "SELECT * FROM tables WHERE id = $1";
const getTableByNumber = "SELECT * FROM tables WHERE table_number = $1";
const addTable = "INSERT INTO tables (table_number, is_occupied) VALUES ($1, $2) RETURNING *";
const updateTable = "UPDATE tables SET table_number = COALESCE($1, table_number), is_occupied = COALESCE($2, is_occupied) WHERE id = $3 RETURNING *";
const deleteTable = "DELETE FROM tables WHERE id = $1";

module.exports = {
    getAllTables,
    getTableById,
    getTableByNumber,
    addTable,
    updateTable,
    deleteTable
}
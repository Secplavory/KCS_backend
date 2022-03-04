const db = require('../db')
const util = require('util');

const getChildrenListById = () => {

}


const HealthInfo = {
    getHealthInfoList: async () => {
        const result = await new Promise((res, rej)=>{
            db.getConnection(async (_, conn)=>{
                try{
                    const query = util.promisify(conn.query).bind(conn)
                    const rows = await query("\
                        SELECT\
                        h.*,\
                        JSON_ARRAYAGG(\
                            JSON_OBJECT(\
                                'id', h__h.healthinfolistid,\
                                'sorted', h__h.sorted,\
                                'title', (SELECT title FROM healthinfo WHERE id = h__h.healthinfolistid)\
                                )\
                            ) as children\
                        FROM healthinfo AS h\
                        JOIN healthinfo__healthinfo AS h__h ON (h.id = h__h.healthinfoid)\
                        GROUP BY h.id\
                    ")
                    rows.forEach(ele => {
                        ele.children = JSON.parse(ele.children)
                    });
                    res({
                        status: "0000",
                        statusText: "Succeed",
                        data: rows
                    })
                }catch(err){
                    rej(err)
                }
                conn.release();
            })
        }).catch((err)=>{console.error(err)})
        return result
    }
}

module.exports = HealthInfo;
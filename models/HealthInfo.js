const db = require('../db')
const util = require('util');
const res = require('express/lib/response');

const HealthInfo = {
    getHealthInfoList: async () => {
        const result = await new Promise((res, rej)=>{
            db.getConnection(async (_, conn)=>{
                try{
                    const query = util.promisify(conn.query).bind(conn)
                    const rows = await query(`\
                        SELECT
                        h.*,
                        if(h__h.id,
                        JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'id', h__h.id,
                                'healthinfoid', h__h.healthinfoid,
                                'healthinfolistid', h__h.healthinfolistid,
                                'sorted', h__h.sorted,
                                'title', (SELECT title FROM healthinfo WHERE id = h__h.healthinfolistid)
                            )
                        ),
                        '[]'
                        ) as children
                        FROM healthinfo AS h
                        LEFT JOIN healthinfo__healthinfo AS h__h ON (h.id = h__h.healthinfoid)
                        GROUP BY h.id
                    `)
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
    },
    createHealthInfo: async (valueList) => {
        const result = await new Promise((res, rej)=>{
            db.getConnection(async (_, conn)=>{
                try{
                    const query = util.promisify(conn.query).bind(conn)
                    await query(`\
                    INSERT INTO healthinfo\
                    (title, brief_desc, notification, imgsrc, full_desc)\
                    VALUES ${valueList}\
                    `)
                    res({
                        status: "0000",
                        statusText: "Success",
                    })
                }catch(err){
                    rej(err)
                }
                conn.release();
            })
        }).catch((err)=>{console.error(err)})
        return result
    },
    updateHealthInfo: async (valueList) => {
        const result = await new Promise((res, rej) => {
            db.getConnection(async (_, conn)=>{
                try{
                    const query = util.promisify(conn.query).bind(conn)
                    await query(`\
                    INSERT INTO healthinfo\
                    (id, title, brief_desc, notification, imgsrc, full_desc)\
                    VALUES ${valueList}\
                    ON DUPLICATE KEY UPDATE\
                    title = VALUES(title),\
                    brief_desc = VALUES(brief_desc),\
                    notification = VALUES(notification),\
                    imgsrc = VALUES(imgsrc),\
                    full_desc = VALUES(full_desc)\
                    `)
                    res({
                        status: "0000",
                        statusText: "Success",
                    })
                }catch(err){
                    rej(err)
                }
                conn.release();
            })
        }).catch((err)=>{console.error(err)})
        return result;
    },
    deleteHealthInfo: async (valueList) => {
        const result = await new Promise((res, rej)=>{
            db.getConnection(async (_, conn)=>{
                try{
                    const query = util.promisify(conn.query).bind(conn)
                    await query(`
                        DELETE FROM healthinfo WHERE id IN ${valueList}
                    `)
                    res({
                        status: "0000",
                        statusText: "Succeed"
                    })
                }catch(err){
                    rej(err)
                }
                conn.release();
            })
        }).catch((err)=>{console.error(err)})
        return result
    },
    createInfoRelations: async (valueList) => {
        const result = await new Promise((res, rej)=>{
            db.getConnection(async (_, conn)=>{
                try{
                    const query = util.promisify(conn.query).bind(conn)
                    await query(`
                    INSERT INTO healthinfo__healthinfo
                    (healthinfoid, healthinfolistid, sorted)
                    VALUES
                    ${valueList}
                    ;
                    `)
                    res({
                        status: "0000",
                        statusText: "Succeed"
                    })
                }catch(err){
                    rej(err)
                }
                conn.release();
            })
        }).catch((err)=>{console.error(err)})
        return result
    },
    updateInfoRelations: async (valueList) => {
        const result = await new Promise((res, rej)=>{
            db.getConnection(async (_, conn)=>{
                try{
                    const query = util.promisify(conn.query).bind(conn)
                    await query(`
                    INSERT INTO healthinfo__healthinfo
                    (
                        id, healthinfoid,
                        healthinfolistid,
                        sorted
                    )
                    VALUES ${valueList}
                    ON DUPLICATE KEY UPDATE
                    healthinfoid = VALUES(healthinfoid),
                    healthinfolistid = VALUES(healthinfolistid),
                    sorted = VALUES(sorted)
                    `)
                    res({
                        status: "0000",
                        statusText: "Succeed"
                    })
                }catch(err){
                    rej(err)
                }
                conn.release();
            })
        }).catch((err)=>{console.error(err)})
        return result
    },
    deleteInfoRelations: async (valueList) => {
        const result = await new Promise((res, rej)=>{
            db.getConnection(async (_, conn)=>{
                try{
                    const query = util.promisify(conn.query).bind(conn)
                    await query(`
                        DELETE FROM healthinfo__healthinfo WHERE id IN ${valueList}
                    `)
                    res({
                        status: "0000",
                        statusText: "Succeed"
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
const db = require('../db');
const util = require('util');

function insertStructure(dataList) {
  let valueList = ``;
  dataList[0].forEach((ele, index) => {
    if (index != 0) {
      valueList += `,`;
    }
    valueList += `(`;
    if (ele.foodId) valueList += `'${ele.foodId}'`;
    else if (ele.id) valueList += `'${ele.id}'`;
    else valueList += `'${ele}'`;
    dataList.forEach((ele, index) => {
      if (index != 0) {
        valueList += `,'${ele}'`;
      }
    });
    valueList += `)`;
  });
  return valueList;
}

function updateStructure(dataList) {
  let valueList = `(`;
  dataList.forEach((ele, index) => {
    if (index != 0) {
      valueList += `,`;
    }
    if (ele.id) valueList += `'${ele.id}'`;
    else if (ele.foodId) valueList += `'${ele.foodId}'`;
    else valueList += `'${ele}'`;
  });
  valueList += `)`;
  return valueList;
}

const Heatmap = {
  getHeatmapPropsByLineID__dateScope: async (lineID, traceBackDate) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          const rows = await query(
            `
              select
              f.foodName as foodName,
              f.foodTag as foodTag,
              sum(ufd.times) as times from user__food__date as ufd
              left join user__food as uf on ufd.user_food_id = uf.id
              left join food as f on f.foodId = uf.food_id
              left join users as u on uf.user_id = u.id
              where u.line_id = ? AND ufd.date >= current_date-?
              group by ufd.user_food_id
            `,
            [lineID, traceBackDate]
          );
          res({
            status: '0000',
            statusText: 'Succeed',
            data: rows,
          });
        } catch (err) {
          rej(err);
        }
        conn.release();
      });
    }).catch((err) => {
      console.error(err);
    });
    return result;
  },
  getHeatmapPropsByLineID: async (lineID) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          const rows = await query(
            `
              select
              f.foodName as foodName,
              f.foodTag as foodTag,
              sum(ufd.times) as times
              from user__food__date as ufd
              left join user__food as uf on ufd.user_food_id = uf.id
              left join food as f on f.foodId = uf.food_id
              left join users as u on uf.user_id = u.id
              where u.line_id = ?
              group by ufd.user_food_id
            `,
            [lineID]
          );
          res({
            status: '0000',
            statusText: 'Succeed',
            data: rows,
          });
        } catch (err) {
          rej(err);
        }
        conn.release();
      });
    }).catch((err) => {
      console.error(err);
    });
    return result;
  },
  getHeatmapPropsByDateScope: async (traceBackDate) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          const rows = await query(
            `
              select
              f.foodName as foodName,
              f.foodTag as foodTag,
              sum(ufd.times) as times from user__food__date as ufd
              left join user__food as uf on ufd.user_food_id = uf.id
              left join food as f on f.foodId = uf.food_id
              left join users as u on uf.user_id = u.id
              where ufd.date >= current_date-?
              group by ufd.user_food_id
            `,
            [traceBackDate]
          );
          res({
            status: '0000',
            statusText: 'Succeed',
            data: rows,
          });
        } catch (err) {
          rej(err);
        }
        conn.release();
      });
    }).catch((err) => {
      console.error(err);
    });
    return result;
  },
  getHeatmapProps: async () => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          const rows = await query(
            `
            select
            f.foodName as foodName,
            f.foodTag as foodTag,
            sum(ufd.times) as times from user__food__date as ufd
            left join user__food as uf on ufd.user_food_id = uf.id
            left join food as f on f.foodId = uf.food_id
            left join users as u on uf.user_id = u.id
            group by ufd.user_food_id
            `
          );
          res({
            status: '0000',
            statusText: 'Succeed',
            data: rows,
          });
        } catch (err) {
          rej(err);
        }
        conn.release();
      });
    }).catch((err) => {
      console.error(err);
    });
    return result;
  },
  updateSearchtime: async (lineId, foodName) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          await query(`INSERT IGNORE INTO users (line_id) VALUES (?)`, [
            lineId,
          ]);
          const insertUserId = await query(
            `SELECT id FROM users WHERE line_id = ?`,
            [lineId]
          );
          const foodIdList = await query(
            `SELECT foodId FROM food WHERE foodName LIKE ?`,
            [`%${foodName}%`]
          );
          await query(
            `INSERT IGNORE INTO user__food (food_id, user_id) VALUES ${insertStructure(
              [foodIdList, insertUserId[0].id]
            )}`
          );
          const insertUser__foodName = await query(
            `SELECT id FROM user__food WHERE user_id=? AND food_id IN ${updateStructure(
              foodIdList
            )}`,
            [insertUserId[0].id]
          );
          const date_ob = new Date();
          let year = date_ob.getFullYear();
          let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
          let date = ('0' + date_ob.getDate()).slice(-2);
          await query(
            `INSERT IGNORE INTO user__food__date (user_food_id, times, date) VALUES ${insertStructure(
              [insertUser__foodName, 0, `${year + month + date}`]
            )}`
          );
          await query(
            `UPDATE user__food__date SET times = (times+1) WHERE user_food_id IN ${updateStructure(
              insertUser__foodName
            )}`
          );
          res({
            status: '0000',
            statusText: 'Succeed',
          });
        } catch (err) {
          rej(err);
        }
        conn.release();
      });
    }).catch((err) => {
      console.error(err);
    });
    return result;
  },
};

module.exports = Heatmap;

const db = require('../db');
const util = require('util');

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
          const query = util.promisify(cdwonn.query).bind(conn);
          const rows = await query(
            `
              select
              f.foodName as foodName,
              f.foodTag as foodTag,
              sum(ufd.times) as times from user__food__date as ufd
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
  updateSearchtime: async (lineId, foodId) => {
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
          await query(
            `INSERT IGNORE INTO user__food (user_id, food_id) VALUES (?, ?)`,
            [insertUserId[0].id, foodId]
          );
          const insertUser__foodId = await query(
            `SELECT id FROM user__food WHERE user_id=? AND food_id=?`,
            [insertUserId[0].id, foodId]
          );
          await query(
            `INSERT IGNORE INTO user__food__date (user_food_id, times, date) VALUES (?, 0,  CURRENT_DATE)`,
            [insertUser__foodId[0].id]
          );
          await query(
            `UPDATE user__food__date SET times = (times+1) WHERE user_food_id = ?`,
            [insertUser__foodId[0].id]
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

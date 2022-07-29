const db = require('../db');
const util = require('util');

const HealthInfo = {
  getHealthInfoList: async () => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          const hList = await query(`SELECT * FROM healthinfo`);
          for (const h of hList) {
            const children = await query(
              `SELECT *, (SELECT title FROM healthinfo where id = h_h.healthinfolistid) as title from healthinfo__healthinfo as h_h where healthinfoid = ?`,
              [h.id]
            );
            h.children = children;
          }
          res({
            status: '0000',
            statusText: 'Succeed',
            data: hList,
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
  createHealthInfo: async (valueList) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          await query(`\
                    INSERT INTO healthinfo\
                    (title, brief_desc, notification, imgsrc, full_desc)\
                    VALUES ${valueList}\
                    `);
          res({
            status: '0000',
            statusText: 'Success',
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
  updateHealthInfo: async (valueList) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
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
                    `);
          res({
            status: '0000',
            statusText: 'Success',
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
  deleteHealthInfo: async (valueList) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          await query(`
                        DELETE FROM healthinfo WHERE id IN ${valueList}
                    `);
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
  createInfoRelations: async (valueList) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          await query(`
                    INSERT INTO healthinfo__healthinfo
                    (healthinfoid, healthinfolistid, sorted)
                    VALUES
                    ${valueList}
                    ;
                    `);
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
  updateInfoRelations: async (valueList) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
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
                    `);
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
  deleteInfoRelations: async (valueList) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          await query(`
                        DELETE FROM healthinfo__healthinfo WHERE id IN ${valueList}
                    `);
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

module.exports = HealthInfo;

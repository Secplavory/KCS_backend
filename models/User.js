const db = require('../db');
const util = require('util');

const userModel = {
  getAllUser: async () => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          const rows = await query('SELECT * FROM users');
          res({
            status: '0000',
            statusText: 'Succeed',
            users: rows,
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
  registerUser: async (
    phoneNumber,
    cryptoPassword,
    gender,
    userName,
    birthDay
  ) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          const rows = await query(
            'INSERT INTO users (phoneNumber, cryptoPassword, gender, name, birthDay)\
                    VALUE (?,?,?,?,?)',
            [phoneNumber, cryptoPassword, gender, userName, birthDay]
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
  loginUser: async (phoneNumber, cryptoPassword) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          const rows = await query(
            'SELECT * FROM users WHERE\
                    phoneNumber=? and cryptoPassword=?',
            [phoneNumber, cryptoPassword]
          );
          if (rows.length === 1) {
            res({
              phoneNumber: rows[0].phoneNumber,
              status: '0000',
              statusText: 'Succeed',
            });
          } else {
            res({
              status: '0010',
              statusText: 'Incorrect phone number and password',
            });
          }
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
  getUserByPhoneNumber: async (phoneNumber) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          const rows = await query('SELECT * FROM users WHERE phoneNumber=?', [
            phoneNumber,
          ]);
          if (rows.length === 1) {
            res({
              status: '0000',
              statusText: 'Succeed',
            });
          } else {
            res({
              status: '0010',
              statusText: 'Incorrect phone number',
            });
          }
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
  getUserById: async (userId) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          const rows = await query(
            'SELECT name, gender, birthday FROM users WHERE id = ?',
            [userId]
          );
          res(rows[0]);
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
  getPressureByUserId: async (userId) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          const rows = await query(
            'SELECT sbp, dbp, map FROM pressure WHERE user_id = ? ORDER BY datetime DESC limit 1',
            [userId]
          );
          res(rows[0]);
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
  getSugarByUserId: async (userId) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          const rows = await query(
            'SELECT sugar, time_period as timePeriod FROM sugar WHERE user_id = ? ORDER BY datetime DESC limit 1',
            [userId]
          );
          res(rows[0]);
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
  getDiseaseType: async (userId) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          const rows = await query(
            `
            SELECT type, color FROM diseasetype
            WHERE id IN (SELECT diseasetype_id FROM user__diseasetype WHERE user_id = ?)
            `,
            [userId]
          );
          res(rows);
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
  getTwitterByUserId: async (userId) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          const rows = await query(
            `
            SELECT id as twitterId, title, content, datetime, imagesrc
            FROM twitter
            WHERE user_id = ?
            ORDER BY datetime DESC
            `,
            [userId]
          );
          res(rows);
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
  getTwitter: async (page, limit) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          const rows = await query(
            `
            SELECT id as twitterId, title, content, datetime, imagesrc
            FROM twitter
            ORDER BY datetime DESC
            LIMIT ? OFFSET ?
            `,
            [limit, (page - 1) * limit]
          );
          res(rows);
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
  getTwitterDetailById: async (twitterId) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          const twitterInfo = await query(
            `
            SELECT title, content, datetime, imagesrc,
            (select name from users where id = t.user_id) as userName,
            (select gender from users where id = t.user_id) as userGender,
            (select birthDay from users where id = t.user_id) as userBirthday
            FROM twitter as t
            WHERE id = ?
            `,
            [twitterId]
          );
          res(twitterInfo[0]);
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
  getBloodPressure: async (userId, page, limit) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          const rows = await query(
            `
            SELECT id as pressureId, sbp, dbp, map, datetime
            FROM pressure
            WHERE user_id = ?
            ORDER BY datetime DESC
            LIMIT ? OFFSET ?
            `,
            [userId, limit, (page - 1) * limit]
          );
          res(rows);
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
  createBloodPressure: async (sbp, dbp, map, datetime, userId) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          await query(
            `
            INSERT INTO pressure
            (sbp, dbp, map, datetime, user_id)
            VALUES
            (?, ?, ?, ?, ?)
            `,
            [sbp, dbp, map, datetime, userId]
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
  updateBloodPressure: async (pressureId, sbp, dbp, map, datetime) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          await query(
            `
            UPDATE pressure
            SET sbp = ?, dbp = ?, map = ?, datetime = ?
            WHERE id = ?
            `,
            [sbp, dbp, map, datetime, pressureId]
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
  deleteBloodPressure: async (pressureId) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          await query(
            `
            DELETE FROM pressure WHERE id = ?
            `,
            [pressureId]
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
  getBloodSugar: async (userId, page, limit) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          const rows = await query(
            `
            SELECT id as sugarId, sugar, datetime, time_period as timePeriod
            FROM sugar
            WHERE user_id = ?
            ORDER BY datetime DESC
            LIMIT ? OFFSET ?
            `,
            [userId, limit, (page - 1) * limit]
          );
          res(rows);
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
  createBloodSugar: async (sugar, datetime, time_period, userId) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          await query(
            `
            INSERT INTO sugar
            (sugar, datetime, time_period, user_id)
            VALUES
            (?, ?, ?, ?)
            `,
            [sugar, datetime, time_period, userId]
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
  updateBloodSugar: async (sugarId, sugar, datetime, time_period) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          await query(
            `
            UPDATE sugar
            SET sugar = ?, datetime = ?, time_period = ?
            WHERE id = ?
            `,
            [sugar, datetime, time_period, sugarId]
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
  deleteBloodSugar: async (sugarId) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          await query(
            `
            DELETE FROM sugar WHERE id = ?
            `,
            [sugarId]
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
  createTwitter: async (title, content, datetime, imageUrl, userId) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          await query(
            `
            INSERT INTO twitter
            (title, content, datetime, imagesrc, user_id)
            VALUES
            (?, ?, ?, ?, ?)
            `,
            [title, content, datetime, imageUrl, userId]
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
  updateTwitter: async (twitterId, title, content, datetime, imageUrl) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          await query(
            `
            UPDATE twitter
            SET title=?, content=?, datetime=?, imagesrc=?
            WHERE id = ?
            `,
            [title, content, datetime, imageUrl, twitterId]
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
  deleteTwitter: async (twitterId) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          await query(
            `
            DELETE FROM twitter WHERE id = ?
            `,
            [twitterId]
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

module.exports = userModel;

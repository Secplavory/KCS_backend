const db = require('../db');
const util = require('util');

const AutoReply = {
  getAll: async () => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          const rows = await query(`
          SELECT
          ar.*,
          if(arc.id,
            JSON_ARRAYAGG(
              JSON_OBJECT(
              'id', arc.id,
              'keyid', arc.keyid,
              'content', arc.content
            )
          ),
          '[]') as contentList
          FROM autoreply AS ar
          LEFT JOIN autoreplycontent AS arc ON (ar.id = arc.keyid)
          GROUP BY ar.id
          `);
          rows.forEach((ele) => {
            ele.contentList = JSON.parse(ele.contentList);
          });
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
  getReplyByKey: async (keyword) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          const rows = await query(
            'SELECT * FROM autoreply WHERE keyword like ?',
            [`%${keyword}%`]
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
  createReply: async (keyword, imgsrc) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          await query(
            `INSERT INTO autoreply (
            keyword, imgsrc
          ) VALUES (
            ?, ?
          )`,
            [keyword, imgsrc]
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
  updateReply: async (id, keyword, imgsrc) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          await query(`UPDATE autoreply SET keyword=?, imgsrc=? WHERE id=?`, [
            keyword,
            imgsrc,
            id,
          ]);
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
  deleteReply: async (id) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          await query(`DELETE FROM autoreply WHERE id=?`, [id]);
          await query(`DELETE FROM autoreplycontent WHERE keyid=?`, [id]);
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
  createReplyContent: async (keyid, content) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          await query(
            `INSERT INTO autoreplycontent (keyid, content) VALUES (?, ?)`,
            [keyid, content]
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
  updateReplyContent: async (id, content) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          await query(`UPDATE autoreplycontent SET content=? WHERE id=?`, [
            content,
            id,
          ]);
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
  deleteReplyContent: async (id) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          await query(`DELETE FROM autoreplycontent WHERE id=?`, [id]);
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

module.exports = AutoReply;

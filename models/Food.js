const db = require('../db');
const util = require('util');

const food = {
  getFoodList: async () =>
    //offset, limit
    {
      const result = await new Promise((res, rej) => {
        db.getConnection(async (_, conn) => {
          try {
            const query = util.promisify(conn.query).bind(conn);
            // const rows = await query(
            //   'SELECT * FROM food \
            //             WHERE foodId >= (SELECT foodId FROM food limit ?, 1)\
            //             limit ?',
            //   [offset, limit]
            // );
            const rows = await query(`SELECT * FROM food`);
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
  getFoodListByType: async (
    foodTag
    //, offset, limit
  ) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          // const rows = await query(
          //   'SELECT * FROM food \
          //               WHERE foodTag=? and foodId >= (SELECT foodId FROM food WHERE foodTag=? limit ?, 1)\
          //               limit ?',
          //   [foodTag, foodTag, offset, limit]
          // );
          const rows = await query(`SELECT * FROM food WHERE foodTag=?`, [
            foodTag,
          ]);
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
  getFoodListByName: async (
    foodName
    //, offset, limit
  ) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          // const rows = await query(
          //   'SELECT * FROM food \
          //               WHERE foodName like ? and foodId >= (SELECT foodId FROM food WHERE foodName like ? limit ?, 1)\
          //               limit ?',
          //   [foodName, foodName, offset, limit]
          // );
          const rows = await query(`SELECT * FROM food WHERE foodName like ?`, [
            foodName,
          ]);
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
  createFood: async (valueList) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          await query(`
                    INSERT INTO food
                    (
                        foodName, foodTag,
                        foodKcal, foodProtein,
                        foodNaa, foodKa,
                        foodP, foodCarbohydrate,
                        isSafe, searchtime
                    )\
                    VALUES
                    ${valueList}
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
  updateFood: async (valueList) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          await query(`
                    INSERT INTO food
                    (
                        foodId,
                        foodName, foodTag,
                        foodKcal, foodProtein,
                        foodNaa, foodKa,
                        foodP, foodCarbohydrate,
                        isSafe, searchtime
                    )
                    VALUES
                    ${valueList}
                    ON DUPLICATE KEY UPDATE
                    foodName = VALUES(foodName),
                    foodTag = VALUES(foodTag),
                    foodKcal = VALUES(foodKcal),
                    foodProtein = VALUES(foodProtein),
                    foodNaa = VALUES(foodNaa),
                    foodKa = VALUES(foodKa),
                    foodP = VALUES(foodP),
                    foodCarbohydrate = VALUES(foodCarbohydrate),
                    isSafe = VALUES(isSafe),
                    searchtime = VALUES(searchtime)
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
  deleteFood: async (valueList) => {
    const result = await new Promise((res, rej) => {
      db.getConnection(async (_, conn) => {
        try {
          const query = util.promisify(conn.query).bind(conn);
          await query(`
                    DELETE FROM food WHERE foodId IN ${valueList}
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

module.exports = food;

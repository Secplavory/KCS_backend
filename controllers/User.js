const userModel = require('../models/User');
const crypto = require('crypto');

const userController = {
  getAllUser: async (req, res) => {
    res.json(await userModel.getAllUser());
    return;
  },
  registerUser: async (req, res) => {
    let dataFromClient,
      phoneNumber,
      password,
      gender,
      name,
      birthday,
      cryptoPassword;
    try {
      dataFromClient = req.body;
      phoneNumber = dataFromClient.phoneNumber;
      password = dataFromClient.password;
      gender = dataFromClient.gender;
      name = dataFromClient.name;
      birthday = dataFromClient.birthday;
      cryptoPassword = crypto
        .createHash('sha256')
        .update(password)
        .digest('hex');
    } catch (err) {
      res.json({
        status: '9999',
        statusText: 'post format not valid',
      });
      return;
    }
    let resJson = await userModel.registerUser(
      phoneNumber,
      cryptoPassword,
      gender,
      name,
      birthday
    );
    res.json(resJson);
    return;
  },
  loginUser: async (req, res) => {
    let dataFromClient, phoneNumber, password, cryptoPassword;
    try {
      dataFromClient = req.body;
      phoneNumber = dataFromClient.phoneNumber;
      password = dataFromClient.password;
      cryptoPassword = crypto
        .createHash('sha256')
        .update(password)
        .digest('hex');
    } catch (err) {
      res.json({
        status: '9999',
        statusText: 'post format not valid',
      });
      return;
    }
    let user = await userModel.loginUser(phoneNumber, cryptoPassword);
    userHashCode = crypto
      .createHash('sha256')
      .update(Math.floor(Math.random() * (999 - 1 + 1) + 1).toString())
      .digest('hex');
    usersHashPair[user.phoneNumber] = userHashCode;
    if (user.status === '0000') {
      user.userHashCode = userHashCode;
    }
    delete user.phoneNumber;
    res.json(user);
    return;
  },
  loginByHash: async (req, res) => {
    let dataFromClient, phoneNumber, userHashCode;
    try {
      dataFromClient = req.body;
      phoneNumber = dataFromClient.phoneNumber;
      userHashCode = dataFromClient.userHashCode;
    } catch (err) {
      res.json({
        status: '9999',
        statusText: 'post format not valid',
      });
      return;
    }
    if (usersHashPair[phoneNumber] !== userHashCode) {
      res.json({
        status: '0010',
        statusText: 'please login again',
      });
      return;
    }
    let resJson = await userModel.getUserByPhoneNumber(phoneNumber);
    res.json(resJson);
  },
  lineLoginGetState: async (req, res) => {
    const dataFromClient = req.query;
    const state = dataFromClient.state;
    console.log('get data using get:', state);
    res.json({
      state: state,
    });
  },
  lineLoginPostState: async (req, res) => {
    const dataFromClient = req.body;
    const state = dataFromClient.state;
    console.log('get data using post:', state);
    res.json({
      state: state,
    });
  },
  getUserBasicInfo: async (req, res) => {
    const dataFromClient = req.query;
    const userId = dataFromClient.userId;
    // ?????? ?????? ?????? ???????????? ???????????? ????????????
    const userInfo = await userModel.getUserById(userId);
    const pressure = await userModel.getPressureByUserId(userId);
    const sugar = await userModel.getSugarByUserId(userId);
    const diseaseTypeList = await userModel.getDiseaseType(userId);

    res.json({
      name: userInfo.name,
      gender: userInfo.gender,
      birthday: userInfo.birthday,
      recentSBP: pressure.sbp,
      recentDBP: pressure.dbp,
      recentMAP: pressure.map,
      recentSugar: sugar.sugar,
      recnetSugarPeriod: sugar.timePeriod,
      diseaseTypeList: diseaseTypeList,
    });
  },
  getUserTwitter: async (req, res) => {
    const dataFromClient = req.query;
    const userId = dataFromClient.userId;
    // ????????????
    const twitterList = await userModel.getTwitterByUserId(userId);

    res.json({
      twitterList: twitterList,
    });
  },
  getAllTwitter: async (req, res) => {
    const dataFromClient = req.query;
    const page = parseInt(dataFromClient.page);
    const limit = parseInt(dataFromClient.limit);

    const twitterList = await userModel.getTwitter(page, limit);

    res.json({
      twitterList: twitterList,
    });
  },
  getUserBloodPressure: async (req, res) => {
    const dataFromClient = req.query;
    const userId = dataFromClient.userId;
    const page = parseInt(dataFromClient.page);
    const limit = parseInt(dataFromClient.limit);

    const bloodPressureList = await userModel.getBloodPressure(
      userId,
      page,
      limit
    );

    res.json({
      bloodPressureList: bloodPressureList,
    });
  },
  bloodPressure: async (req, res) => {
    const dataFromClient = req.body;
    let response = {};

    if (req.method === 'POST') {
      const sbp = dataFromClient.sbp;
      const dbp = dataFromClient.dbp;
      const map = dataFromClient.map;
      const datetime = dataFromClient.datetime;
      const userId = dataFromClient.userId;
      response = await userModel.createBloodPressure(
        sbp,
        dbp,
        map,
        datetime,
        userId
      );
    } else if (req.method === 'PUT') {
      const pressureId = dataFromClient.pressureId;
      const sbp = dataFromClient.sbp;
      const dbp = dataFromClient.dbp;
      const map = dataFromClient.map;
      const datetime = dataFromClient.datetime;
      response = await userModel.updateBloodPressure(
        pressureId,
        sbp,
        dbp,
        map,
        datetime
      );
    } else if (req.method === 'DELETE') {
      const pressureId = dataFromClient.pressureId;
      response = await userModel.deleteBloodPressure(pressureId);
    }

    res.json(response);
  },
  getUserBloodSugar: async (req, res) => {
    const dataFromClient = req.query;
    const userId = dataFromClient.userId;
    const page = parseInt(dataFromClient.page);
    const limit = parseInt(dataFromClient.limit);

    const bloodSugarList = await userModel.getBloodSugar(userId, page, limit);

    res.json({
      bloodSugarList: bloodSugarList,
    });
  },
  bloodSugar: async (req, res) => {
    const dataFromClient = req.body;
    let response = {};

    if (req.method === 'POST') {
      const sugar = dataFromClient.sugar;
      const datetime = dataFromClient.datetime;
      const time_period = dataFromClient.timePeriod;
      const userId = dataFromClient.userId;
      response = await userModel.createBloodSugar(
        sugar,
        datetime,
        time_period,
        userId
      );
    } else if (req.method === 'PUT') {
      const sugarId = dataFromClient.sugarId;
      const sugar = dataFromClient.sugar;
      const time_period = dataFromClient.timePeriod;
      const datetime = dataFromClient.datetime;
      response = await userModel.updateBloodSugar(
        sugarId,
        sugar,
        datetime,
        time_period
      );
    } else if (req.method === 'DELETE') {
      const sugarId = dataFromClient.sugarId;
      response = await userModel.deleteBloodSugar(sugarId);
    }

    res.json(response);
  },
  getTwitterDetail: async (req, res) => {
    const dataFromClient = req.query;
    const twitterId = dataFromClient.twitterId;
    const response = await userModel.getTwitterDetailById(twitterId);
    res.json(response);
  },
  createTwitter: async (req, res) => {
    const dataFromClient = req.body;
    const title = dataFromClient.title;
    const content = dataFromClient.content;
    const datetime = dataFromClient.datetime;
    const imageUrl = dataFromClient.imageUrl;
    const userId = dataFromClient.userId;

    const response = await userModel.createTwitter(
      title,
      content,
      datetime,
      imageUrl,
      userId
    );

    res.json(response);
  },
  updateTwitter: async (req, res) => {
    const dataFromClient = req.body;
    const twitterId = dataFromClient.twitterId;
    const title = dataFromClient.title;
    const content = dataFromClient.content;
    const datetime = dataFromClient.datetime;
    const imageUrl = dataFromClient.imageUrl;

    const response = await userModel.updateTwitter(
      twitterId,
      title,
      content,
      datetime,
      imageUrl
    );

    res.json(response);
  },
  deleteTwitter: async (req, res) => {
    const dataFromClient = req.body;
    const twitterId = dataFromClient.twitterId;
    const response = await userModel.deleteTwitter(twitterId);

    res.json(response);
  },
};

module.exports = userController;

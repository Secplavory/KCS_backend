const AutoReplyModel = require('../models/AutoReply');

const AutoReply = {
  getAll: async (req, res) => {
    res.json(await AutoReplyModel.getAll());
  },
  getReplyByKey: async (req, res) => {
    const dataFromClient = req.query;
    const keyword = dataFromClient.keyword;
    res.json(await AutoReplyModel.getReplyByKey(keyword));
  },
  createReply: async (req, res) => {
    const dataFromClient = req.body;
    const keyword = dataFromClient.keyword;
    const imgsrc = dataFromClient.imgsrc;

    const result = await AutoReplyModel.createReply(keyword, imgsrc);
    res.json(result);
  },
  updateReply: async (req, res) => {
    const dataFromClient = req.body;
    const id = dataFromClient.id;
    const keyword = dataFromClient.keyword;
    const imgsrc = dataFromClient.imgsrc;
    const result = await AutoReplyModel.updateReply(id, keyword, imgsrc);
    res.json(result);
  },
  deleteReply: async (req, res) => {
    const dataFromClient = req.body;
    const id = dataFromClient.id;
    const result = await AutoReplyModel.deleteReply(id);
    res.json(result);
  },
  createReplyContent: async (req, res) => {
    const dataFromClient = req.body;
    const keyid = dataFromClient.keyid;
    const content = dataFromClient.content;
    const result = await AutoReplyModel.createReplyContent(keyid, content);
    res.json(result);
  },
  updateReplyContent: async (req, res) => {
    const dataFromClient = req.body;
    const id = dataFromClient.id;
    const content = dataFromClient.content;
    const result = await AutoReplyModel.updateReplyContent(id, content);
    res.json(result);
  },
  deleteReplyContent: async (req, res) => {
    const dataFromClient = req.body;
    const id = dataFromClient.id;
    const result = await AutoReplyModel.deleteReplyContent(id);
    res.json(result);
  },
};

module.exports = AutoReply;

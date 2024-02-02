const books = require("../model/book.model");
const checkouts = require("../model/checkout.model");
const { upsertData } = require("../utils/mongo/mongoDao");

exports.addorupdatecheckout = async (body, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await upsertData({ userId }, checkouts, { ...body, userId });
      resolve(await this.getcheckout(userId));
    } catch (err) {
      reject(err);
    }
  });
};

exports.getcheckout = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = (await checkouts.findOne({ userId })) || {};
      result = JSON.parse(JSON.stringify(result));
      result.totalCost = 0;
      if (result?.books?.length > 0) {
        let bookList = await books.find({
          _id: { $in: result.books.map((x) => x.id) },
        });
        result.books = result.books.map((x) => {
          let book = bookList.find((y) => y.id === x.id);
          result.totalCost += book.costPerDay * x.days;
          return { ...x, ...JSON.parse(JSON.stringify(book)) };
        });
      }
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};

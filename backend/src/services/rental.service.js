const books = require("../model/book.model");
const checkouts = require("../model/checkout.model");
const rentals = require("../model/rental.model");
const { upsertData } = require("../utils/mongo/mongoDao");

exports.addorupdaterental = async (body, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let rental = new rentals({ userId, ...body });
      rental.save();
      for (let book of body.books || []) {
        await upsertData({ _id: book.id }, books, { availability: false });
      }
      await upsertData({ userId }, checkouts, { books: [], userId });
      resolve(await this.getrental(userId));
    } catch (err) {
      reject(err);
    }
  });
};

exports.getrental = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let list = (await rentals.find({ userId })) || {};
      let result = { userId };
      result.books = [];
      for (let l of list) {
        result.books = [...result.books, ...l.books];
      }
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

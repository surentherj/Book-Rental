const books = require("../model/book.model");
const { upsertData } = require("../utils/mongo/mongoDao");

exports.addbook = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Book = new books(body);
      await Book.save();
      resolve(await books.findOne(body).sort({ createdAt: -1 }));
    } catch (err) {
      reject(err);
    }
  });
};

exports.getbook = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await books.findOne({ _id: id });
      resolve(result || {});
    } catch (err) {
      reject(err);
    }
  });
};

exports.updatebook = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { response: bookDetail } = await upsertData(
        { _id: body.id },
        books,
        body
      );
      resolve(bookDetail);
    } catch (err) {
      reject(err);
    }
  });
};

exports.getbooklist = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { startAt = 0, maxResult = 20, searchValue } = body;
      let searchObj = {};
      if (searchValue) {
        searchObj = {
          $or: [
            { name: { $regex: searchValue, $options: "i" } },
            { author: { $elemMatch: { $regex: searchValue, $options: "i" } } },
            { publisher: { $regex: searchValue, $options: "i" } },
          ],
        };
      }
      let result = {};
      result.total = await books.countDocuments(searchObj);
      result.books = await books
        .find(searchObj)
        .skip(startAt)
        .limit(maxResult)
        .sort({ name: 1 });
      result.startAt = startAt;
      result.searchValue = searchValue;
      result.maxResult = result?.books?.length || 0;
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};

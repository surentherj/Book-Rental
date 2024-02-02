const ObjectId = require("mongoose").Types.ObjectId;

exports.upsertData = async (searchObj, collectionName, data, refData) => {
  const response = await collectionName.findOneAndUpdate(
    { ...searchObj },
    {
      $addToSet: { ...refData },
      $set: {
        ...data,
      },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  return { response };
};

exports.updateMany = async (searchObj, collectionName, data, refData) => {
  const response = await collectionName.updateMany(
    { ...searchObj },
    {
      $addToSet: { ...refData },
      $set: {
        ...data,
      },
    },
    { upsert: true }
  );
  return { response };
};

exports.searchCollection = async (
  searchObj,
  collectionName,
  columns = null
) => {
  const response = columns
    ? await collectionName.find({ ...searchObj }).select(columns)
    : await collectionName.find({ ...searchObj });
  return response;
};

exports.searchCollectionWithRef = async (
  searchObj,
  collectionName,
  columns = null,
  ref
) => {
  const response = columns
    ? await collectionName
        .find({ ...searchObj })
        .populate(ref)
        .select(columns)
    : await collectionName.find({ ...searchObj }).populate(ref);
  return response;
};

exports.findOneWithRef = async (
  searchObj,
  collectionName,
  columns = null,
  ref
) => {
  const response = columns
    ? await collectionName
        .findOne({ ...searchObj })
        .populate(ref)
        .select(columns)
    : await collectionName.findOne({ ...searchObj }).populate(ref);
  return response;
};

exports.findOne = async (searchObj, collectionName, columns = null) => {
  const response = columns
    ? await collectionName.findOne({ ...searchObj }).select(columns)
    : await collectionName.findOne({ ...searchObj });
  return response;
};

exports.findOneAndUpdate = async (
  searchObj,
  collectionName,
  data,
  columns = null
) => {
  const response = columns
    ? await collectionName
        .findOneAndUpdate({ ...searchObj }, data, {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        })
        .select(columns)
    : await collectionName.findOneAndUpdate({ ...searchObj }, data, {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      });
  return response;
};

exports.getDistinctValues = async (searchObj, collectionName, column) => {
  const response = await collectionName.distinct(column, searchObj);
  return response;
};

exports.clearAndInsertMany = async (
  collectionName,
  deleteByObj,
  insertBatchData
) => {
  await deleteMany(collectionName, deleteByObj);
  await insertMany(collectionName, insertBatchData);
};

const insertMany = (exports.insertMany = async (
  collectionName,
  insertBatchData
) => {
  await collectionName.insertMany(insertBatchData);
});

const deleteMany = (exports.deleteMany = async (
  collectionName,
  deleteByObj
) => {
  await collectionName.deleteMany(deleteByObj);
});

exports.parseMongoDbStringFormat = (data) => {
  return data.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

exports.constructMongoDBRegex = (string) => {
  let regexExp = "";
  if (string) {
    const isAlpha = new RegExp(/^[a-zA-Z]+$/);

    Array.from(string).forEach((item) => {
      regexExp += isAlpha.test(item)
        ? `[${item.toLowerCase()}${item.toUpperCase()}] *`
        : `[${item}]`;
    });
  }
  return regexExp;
};

exports.stringToObjectId = (input) => {
  return new ObjectId(input);
};

import { UPDATE_LANDING_PAGE, UPDATE_LANDING_PAGE_BOOK } from "../actionTypes";

const initialState = {};

function LandingPageReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_LANDING_PAGE:
      let books = payload.startAt > 0 ? state?.books || [] : [];
      return {
        ...state,
        books: getDistinctObjectsByKey([...books, ...payload.books], "id"),
        maxResult: payload.maxResult,
        startAt: payload.startAt,
        total: payload.total,
        searchValue: payload.searchValue,
      };
    case UPDATE_LANDING_PAGE_BOOK:
      let list = state?.books || [];
      let index = list?.findIndex((x) => x.id === payload.book.id);
      if (index > -1) {
        list[index] = payload.book;
      } else {
        list = [payload.book, ...list];
      }
      return {
        ...state,
        books: list,
      };
    default:
      return state;
  }
}

function getDistinctObjectsByKey(objects, key) {
  const seen = new Set();
  return objects.filter((obj) => {
    const keyValue = obj[key];
    return seen.has(keyValue) ? false : seen.add(keyValue);
  });
}

export default LandingPageReducer;

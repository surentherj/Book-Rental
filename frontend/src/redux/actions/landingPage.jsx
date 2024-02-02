import apiEndPoints from "../../constants/apiEndPoints";
import api from "../../utils/api";
import { UPDATE_LANDING_PAGE, UPDATE_LANDING_PAGE_BOOK } from "../actionTypes";
import { setAlert } from "./toast";

export const getBooksOnLazyScroll = (obj) => (dispatch) => {
  api
    .post(apiEndPoints.GET_BOOK_LIST(), obj)
    .then((res) => {
      dispatch({
        type: UPDATE_LANDING_PAGE,
        payload: {
          books: res.data.books,
          maxResult: res.data.maxResult,
          startAt: res.data.startAt,
          total: res.data.total,
          searchValue: res.data.searchValue,
        },
      });
    })
    .catch((err) => {
      dispatch(setAlert(err?.response?.data?.message, "danger", 2000));
    });
};

export const addOrUpdateBook = (obj) => (dispatch) => {
  api
    .post(obj?.id ? apiEndPoints.UPDATE_BOOK() : apiEndPoints.ADD_BOOK(), obj)
    .then((res) => {
      dispatch({
        type: UPDATE_LANDING_PAGE_BOOK,
        payload: {
          book: res.data,
        },
      });

      dispatch(
        setAlert(
          (obj?.id ? "Updated" : "Created") + " Successfully",
          "success",
          2000
        )
      );
    })
    .catch((err) => {
      dispatch(setAlert(err?.response?.data?.message, "danger", 2000));
    });
};


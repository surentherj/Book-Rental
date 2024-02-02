import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIconSmall from "../../components/icons/close-s";
import EditIcon from "../../components/icons/edit";
import SearchIcon from "../../components/icons/search";
import TickIcon from "../../components/icons/tickIcon";
import Sidedraw from "../../components/sidedraw";
import {
  addOrUpdateBook,
  getBooksOnLazyScroll,
} from "../../redux/actions/landingPage";
import AddOrEditScreen from "./addOrEditScreen";
import CartScreen from "./cartScreen";
import ViewScreen from "./viewScreen";
import DashboardIcon from "../../components/icons/dashboardIcon";

const LandingPage = () => {
  const dispatch = useDispatch();
  const bookListRef = useRef();
  const tableRef = useRef(null);
  const [bookDetail, setBookDetail] = useState({});
  const [addOredit, setAddorEdit] = useState(false);
  const [view, setView] = useState(false);
  const [viewMyCart, setViewMyCart] = useState(false);
  const {
    startAt,
    maxResult,
    searchValue,
    total,
    books,
    user,
    checkOutList,
    rentalList,
  } = useSelector((state) => ({
    maxResult: state?.landingPage?.maxResult || 20,
    startAt: state?.landingPage?.startAt || 0,
    searchValue: state?.landingPage?.searchValue || "",
    total: state?.landingPage?.total || 0,
    books: state?.landingPage?.books || [],
    user: state?.auth?.user,
    checkOutList: state?.auth?.checkout?.books || [],
    rentalList: state?.auth?.rental?.books || [],
  }));

  useEffect(() => {
    bookListRef.current = {
      total,
      books,
      searchValue,
    };
  }, [total, books, searchValue]);

  useEffect(() => {
    dispatch(
      getBooksOnLazyScroll({
        startAt: 0,
        maxResult: 20,
        searchValue: "",
      })
    );
  }, []);

  const handleLazyScroll = () => {
    let { books, total, searchValue } = bookListRef.current;
    const { scrollTop, clientHeight, scrollHeight } = tableRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      if (startAt + maxResult < total && books.length < total) {
        dispatch(
          getBooksOnLazyScroll({
            startAt: startAt + maxResult,
            maxResult,
            searchValue,
          })
        );
      }
    }
  };

  useEffect(() => {
    const sidebarElement = tableRef?.current;
    sidebarElement.addEventListener("scroll", handleLazyScroll);
    return () => {
      sidebarElement.removeEventListener("scroll", handleLazyScroll);
    };
  }, [startAt, total, books?.length, dispatch]);

  const currentHour = new Date().getHours();
  return (
    <>
      <div className="content-wrapper">
        <div className="container-fluid" id="homePageHeader">
          <div className="row mb-two-s align-self-stretch">
            <h2 className="font-r ml-one-s font-medium grey1">
              {currentHour >= 5 && currentHour < 12
                ? "Good Morning"
                : currentHour >= 12 && currentHour < 18
                ? "Good Afternoon"
                : "Good Evening"}
              , {localStorage?.name}
            </h2>
          </div>
          <div className="row ">
            <div className="col-xl-12 col-lg-12 col-md-12  d-flex align-items-center flex-center-space-between">
              <div className="d-flex align-items-center">
                <div className="form-group pointer filter-search">
                  <input
                    placeholder="Title/Author/Publisher"
                    className="form-control size-s"
                    onChange={(e) => {
                      dispatch(
                        getBooksOnLazyScroll({
                          startAt: 0,
                          maxResult: 20,
                          searchValue: e.target.value?.trim(),
                        })
                      );
                    }}
                    value={searchValue}
                  />
                  <div className="form-icon">
                    <div className="icon-wrap icon-s">
                      <SearchIcon />
                    </div>
                  </div>
                </div>
                <div className="ml-two-s">
                  <div className="font-s">
                    Showing {books?.length} out of {total} books
                    {books?.length !== total && (
                      <>, to fetch more just scroll the list</>
                    )}
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="icon-wrap icon-s">
                  <DashboardIcon fill="red" />
                </div>
                <div className="font-s">
                  : Already Rented (Not For Rental Again)
                </div>
                <div className="icon-wrap icon-s ml-one-s ">
                  <DashboardIcon fill="blue" />
                </div>
                <div className="font-s">: In Cart</div>
                {user?.addBook && (
                  <div
                    className="btn btn-xsmall ml-two-s btn-primary-border"
                    onClick={() => {
                      setBookDetail({ availability: true });
                      setAddorEdit(true);
                    }}
                  >
                    + Add New
                  </div>
                )}
                <div
                  className="btn btn-xsmall ml-one-s btn-primary-border"
                  onClick={() => {
                    setViewMyCart(true);
                  }}
                >
                  My Cart ({checkOutList.length} books - ₹
                  {checkOutList.reduce((sum, checkout) => {
                    return sum + checkout.days * checkout.costPerDay;
                  }, 0)}
                  )
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 mt-one-s">
              <div
                className={`table-wrapper issue-list-table
        }`}
                style={{ overflowX: "auto" }}
                ref={tableRef}
              >
                {books?.length > 0 ? (
                  <table>
                    <thead>
                      <tr className="table-head-row zIndex">
                        <th className={`table-head-column`}>Title</th>
                        <th className={`table-head-column`}>Description</th>
                        <th className={`table-head-column`}>Author</th>
                        <th className={`table-head-column`}>Publisher</th>
                        <th className={`table-head-column`}>Cost/Day</th>
                        <th className={`table-head-column`}>Availability</th>
                        <th className={`table-head-column`}></th>
                        {user?.addBook && (
                          <th className={`table-head-column`}>Edit</th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="list-table-body">
                      {books?.map((book) => (
                        <tr
                          className={`table-row pointer ${
                            checkOutList?.find((x) => x.id === book.id) &&
                            "selected-row"
                          }  ${
                            rentalList?.find((x) => x.id === book.id) &&
                            "selected-row1"
                          } `}
                          onClick={(e) => {
                            e.stopPropagation();
                            setBookDetail(book);
                            setView(true);
                          }}
                        >
                          <td className="table-column ">
                            <div className="d-flex align-items-center">
                              <img
                                src={
                                  book?.imageUrl ||
                                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbr79zl8bJUaCeMp2rvbWGgp6MIXVQnc4QvZU_gEcGVQ&s"
                                }
                                alt=""
                                height="50"
                                width="50"
                              />

                              <div className="ml-one-s font-bold">
                                {book?.name}
                              </div>
                            </div>
                          </td>
                          <td className="table-column">{book.description}</td>
                          <td className="table-column">
                            {book?.author?.join(", ")}
                          </td>
                          <td className="table-column">{book?.publisher}</td>
                          <td className="table-column">₹{book?.costPerDay}</td>

                          <td className="table-column">
                            <div className="icon-wrap icon-s">
                              {book?.availability ? (
                                <TickIcon fill={"green"} />
                              ) : (
                                <CloseIconSmall fill={"red"} />
                              )}
                            </div>
                          </td>
                          <td className="table-column">
                            {rentalList?.find((x) => x.id === book.id) &&
                              !book?.availability && (
                                <div
                                  className="btn btn-xsmall btn-primary-border right mr-two-s"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(
                                      addOrUpdateBook({
                                        ...book,
                                        availability: true,
                                      })
                                    );
                                  }}
                                >
                                  Return
                                </div>
                              )}
                          </td>
                          {user?.addBook && (
                            <td className="table-column">
                              <div
                                className="icon-wrap icon-s"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setBookDetail(book);
                                  setAddorEdit(true);
                                }}
                              >
                                <EditIcon fill={"grey"} />
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="table-wrapper issue-list-table d-flex align-items-center justify-content-center">
                    <h3>No Books Found</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {addOredit && (
        <Sidedraw
          size="small"
          title={bookDetail?.id ? "Edit Book" : "Add Book"}
          setOverlay={setAddorEdit}
          contentComponent={
            <div className="wd-100 mt-two-s">
              <AddOrEditScreen
                bookDetail={bookDetail}
                setAddorEdit={setAddorEdit}
              />
            </div>
          }
        />
      )}
      {view && (
        <Sidedraw
          size="medium"
          title={bookDetail?.name}
          setOverlay={setView}
          contentComponent={
            <div className="wd-100 mt-two-s">
              <ViewScreen book={bookDetail} setView={setView} />
            </div>
          }
        />
      )}
      {viewMyCart && (
        <Sidedraw
          size="medium"
          title={`My Cart (${checkOutList.length} books - ₹
            ${checkOutList.reduce((sum, checkout) => {
              return sum + checkout.days * checkout.costPerDay;
            }, 0)}
            )`}
          setOverlay={setViewMyCart}
          contentComponent={
            <div className="wd-100 mt-two-s">
              <CartScreen setViewMyCart={setViewMyCart} />
            </div>
          }
        />
      )}
    </>
  );
};

export default LandingPage;

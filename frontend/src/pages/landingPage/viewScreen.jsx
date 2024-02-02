import { useDispatch, useSelector } from "react-redux";
import { FormInput } from "../../components/forms";
import CloseIconSmall from "../../components/icons/close-s";
import TickIcon from "../../components/icons/tickIcon";
import { addOrUpdateCart } from "../../redux/actions/auth";
import { useState } from "react";

const ViewScreen = ({ book, setView }) => {
  const dispatch = useDispatch();
  const { checkOutList, rentalList } = useSelector((state) => ({
    checkOutList: state?.auth?.checkout?.books || [],
    rentalList: state?.auth?.rental?.books || [],
  }));
  const [days, setDays] = useState(
    checkOutList?.find((x) => x.id === book.id)?.days || 1
  );
  return (
    <>
      <div className="ticket-detail-wrapper">
        <div className="row flex-center-space-between mb-two-s">
          <div className="col-lg-6 col-md-6">
            <img
              src={
                book?.imageUrl ||
                "https://m.timesofindia.com/photo/104701845/104701845.jpg"
              }
              alt=""
              height="300"
              width="300"
            />
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="row mb-two-s">
              <span className="issue-head">Title</span>
              <span className="issue-body">{book.name}</span>
            </div>
            <div className="row mb-two-s">
              <span className="issue-head">Description</span>
              <span className="issue-body">{book.description}</span>
            </div>
            <div className="row mb-two-s">
              <span className="issue-head">Author</span>
              <span className="issue-body">{book.author.join(", ")}</span>
            </div>
            <div className="row mb-two-s">
              <span className="issue-head">Publisher</span>
              <span className="issue-body">{book.publisher}</span>
            </div>
            <div className="row mb-two-s">
              <span className="issue-head">Availability</span>
              <span className="issue-body">
                <div className="icon-wrap icon-s">
                  {book?.availability ? (
                    <TickIcon fill={"green"} />
                  ) : (
                    <CloseIconSmall fill={"red"} />
                  )}
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="ticket-detail-wrapper mt-two-s">
        <div className="row flex-center-space-between align-tems-center mb-two-s">
          <div className="col-lg-6 col-md-6">
            <div className="mb-two-s ml-two-s">
              <span className="issue-head">Cost Per Day</span>
              <span className="issue-body">₹{book?.costPerDay}</span>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            {book.availability &&
              !rentalList?.find((x) => x.id === book.id) && (
                <div className="mb-two-s">
                  <span className="issue-head">
                    {"Select Days For Rental (<=30days)"}
                  </span>
                  <span className="issue-body">
                    <FormInput
                      id="noOfDays"
                      type="number"
                      min="1"
                      max="30"
                      isRequired={false}
                      disabled={checkOutList?.find((x) => x.id === book.id)}
                      name="noOfDays"
                      value={days}
                      onChange={(e) => {
                        setDays(e.target.value);
                      }}
                    />
                  </span>
                </div>
              )}
          </div>
        </div>
      </div>
      <div className="sidedraw-footer d-flex align-items-center flex-center-end">
        {book?.availability && !rentalList?.find((x) => x.id === book.id) && (
          <div className="right mr-two-s font-s">
            Cost : ₹{days * book.costPerDay}
          </div>
        )}
        <div
          className="btn btn-xsmall btn-primary-border right mr-two-s"
          onClick={() => {
            setView(false);
          }}
        >
          Close
        </div>
        {book?.availability && !rentalList?.find((x) => x.id === book.id) && (
          <div
            className={`btn btn-xsmall right btn-primary`}
            onClick={() => {
              if (checkOutList?.find((x) => x.id === book.id)) {
                dispatch(
                  addOrUpdateCart({
                    books: [
                      ...checkOutList
                        .filter((x) => x.id !== book.id)
                        .map((x) => {
                          return { id: x.id, days: x.days };
                        }),
                    ],
                  })
                );
              } else {
                dispatch(
                  addOrUpdateCart({
                    books: [
                      ...checkOutList.map((x) => {
                        return { id: x.id, days: x.days };
                      }),
                      { id: book.id, days },
                    ],
                  })
                );
              }
            }}
          >
            {checkOutList?.find((x) => x.id === book.id)
              ? "Remove From Cart"
              : "Add To Cart"}
          </div>
        )}
      </div>
    </>
  );
};

export default ViewScreen;

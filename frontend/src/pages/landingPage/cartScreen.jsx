import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "../../components/icons/delete";
import { addOrUpdateCart, payCost } from "../../redux/actions/auth";

const CartScreen = ({ setViewMyCart }) => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => ({
    books: state?.auth?.checkout?.books || [],
  }));
  return (
    <>
      <div className="col-lg-12 col-md-12 mt-one-s">
        <div
          className={`table-wrapper issue-list-table
}`}
          style={{ overflowX: "auto" }}
        >
          {books?.length > 0 ? (
            <table>
              <thead>
                <tr className="table-head-row zIndex">
                  <th className={`table-head-column`}>Title</th>
                  <th className={`table-head-column`}>Description</th>
                  <th className={`table-head-column`}>Author</th>
                  <th className={`table-head-column`}>Publisher</th>
                  <th className={`table-head-column`}>Cost</th>
                  <th className={`table-head-column`}>Remove</th>
                </tr>
              </thead>
              <tbody className="list-table-body">
                {books?.map((book) => (
                  <tr className={`table-row`}>
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

                        <div className="ml-one-s font-bold">{book?.name}</div>
                      </div>
                    </td>
                    <td className="table-column">{book.description}</td>
                    <td className="table-column">{book?.author?.join(", ")}</td>
                    <td className="table-column">{book?.publisher}</td>
                    <td className="table-column">
                      ₹{book?.costPerDay} * {book.days} = ₹
                      {book?.costPerDay * book.days}
                    </td>
                    <td className="table-column">
                      <div
                        className="icon-wrap icon-s"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(
                            addOrUpdateCart({
                              books: [
                                ...books
                                  .filter((x) => x.id !== book.id)
                                  .map((x) => {
                                    return { id: x.id, days: x.days };
                                  }),
                              ],
                            })
                          );
                        }}
                      >
                        <DeleteIcon fill={"red"} />
                      </div>
                    </td>
                  </tr>
                ))}
                <tr className={`table-row `}>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="table-column">
                    ₹ $
                    {books.reduce((sum, checkout) => {
                      return sum + checkout.days * checkout.costPerDay;
                    }, 0)}
                  </td>
                  <td className="table-column">Total Cost</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div className="table-wrapper issue-list-table d-flex align-items-center justify-content-center">
              <h3>No Books Added To Cart</h3>
            </div>
          )}
        </div>
      </div>
      <div className="sidedraw-footer">
        {books?.length > 0 && (
          <div
            className={`btn btn-xsmall right btn-primary`}
            onClick={() => {
              dispatch(
                payCost({
                  books: [
                    ...books.map((x) => {
                      return { id: x.id, days: x.days };
                    }),
                  ],
                })
              );
            }}
          >
            Pay
          </div>
        )}
        <div
          className="btn btn-xsmall btn-primary-border right mr-two-s"
          onClick={() => {
            setViewMyCart(false);
          }}
        >
          Close
        </div>
      </div>
    </>
  );
};

export default CartScreen;

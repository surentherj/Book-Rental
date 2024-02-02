import { useState } from "react";
import { FormInput } from "../../components/forms";
import { useDispatch } from "react-redux";
import { addOrUpdateBook } from "../../redux/actions/landingPage";
import Switch from "../../components/forms/switch";

const AddOrEditScreen = ({ bookDetail, setAddorEdit }) => {
  const dispatch = useDispatch();
  const [obj, setObj] = useState(bookDetail);
  const onChange = (e) => {
    setObj({ ...obj, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="wd-100">
        <FormInput
          id="name"
          type="text"
          isRequired={false}
          labelText="Book Title"
          name="name"
          value={obj?.name || ""}
          warnText="Book Title is required"
          onChange={onChange}
        />
        <FormInput
          id="description"
          type="text"
          isRequired={false}
          labelText="Book Description"
          name="description"
          value={obj?.description || ""}
          warnText="Book Description is required"
          onChange={onChange}
        />
        <FormInput
          id="author"
          type="text"
          isRequired={false}
          labelText="Book Author (if > 1, enter as comma separated)"
          name="author"
          value={obj?.author || ""}
          warnText="Book Author is required"
          onChange={onChange}
        />
        <FormInput
          id="publisher"
          type="text"
          isRequired={false}
          labelText="Book Publisher"
          name="publisher"
          value={obj?.publisher || ""}
          warnText="Book Publisher is required"
          onChange={onChange}
        />
        <FormInput
          id="costPerDay"
          type="number"
          min="0"
          isRequired={false}
          labelText="Cost Per Day in ₹"
          name="costPerDay"
          value={obj?.costPerDay || ""}
          onChange={onChange}
        />
        <FormInput
          id="imageUrl"
          type="text"
          isRequired={false}
          labelText="Book Ref Image"
          name="imageUrl"
          value={obj?.imageUrl || ""}
          onChange={onChange}
        />
      </div>
      <div className="row">
        <div className="d-flex align-items-center ">
          <span className="font-m grey1 ml-one-s mr-three-s">Availability</span>
          <Switch
            name="availability"
            checked={obj.availability ? obj.availability : false}
            onChangeEventHandler={(e) => {
              setObj({
                ...obj,
                availability: !obj.availability,
              });
            }}
          />
        </div>
      </div>
      <div className="sidedraw-footer">
        <div
          className={`btn btn-xsmall right btn-primary`}
          onClick={() => {
            dispatch(addOrUpdateBook(obj));
            setAddorEdit(false);
          }}
        >
          Save
        </div>
        <div
          className="btn btn-xsmall btn-primary-border right mr-two-s"
          onClick={() => {
            setAddorEdit(false);
          }}
        >
          Cancel
        </div>
      </div>
    </>
  );
};
export default AddOrEditScreen;

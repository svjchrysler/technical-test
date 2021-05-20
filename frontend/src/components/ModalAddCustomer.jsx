import React, { useState } from "react";
import Modal from "react-modal";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-date-picker";
import CustomerService from "../services/api/CustomerService";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phoneNumber: yup.string().required(),
  email: yup
    .string()
    .required("This field is required")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Incorrect Format"),
  birthDate: yup.string().required(),
});

const ModalAddCustomer = ({
  visible = false,
  closeModalAddCustomer,
  saveCustomer,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState({ isVisible: false, message: "" });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    const information = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone_number: data.phoneNumber,
      birth_date: new Date(data.birthDate).toISOString(),
    };

    CustomerService.saveCustomer(information)
      .then((response) => {
        saveCustomer(response);
      })
      .catch((error) => {
        setHasError({
          isVisible: true,
          message: error.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal isOpen={visible} style={customStyles} contentLabel="Loading">
      <div className="flex flex-col items-center">
        <h2>Add Customer</h2>
        <form className="mt-3.5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row gap-2 grid-cols-2 my-2">
            <div className="flex flex-col">
              <input
                placeholder="firstName"
                className="form-input"
                defaultValue=""
                type="text"
                {...register("firstName")}
              />
              {errors.firstName && (
                <span className="mt-1 text-red-400 text-xs">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <input
                placeholder="lastName"
                className="form-input"
                defaultValue=""
                type="text"
                {...register("lastName")}
              />
              {errors.lastName && (
                <span className="mt-1 text-red-400 text-xs">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-row gap-2 grid-cols-2 my-2">
            <div className="flex flex-col">
              <input
                placeholder="email"
                className="form-input"
                defaultValue=""
                type="text"
                {...register("email")}
              />
              {errors.email && (
                <span className="mt-1 text-red-400 text-xs">
                  {errors.email?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <input
                placeholder="phoneNumber"
                className="form-input"
                defaultValue=""
                type="text"
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && (
                <span className="mt-1 text-red-400 text-xs">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col my-2">
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <DatePicker onChange={onChange} value={value} />
              )}
              name="birthDate"
              defaultValue=""
            />
            {errors.birthDate && (
              <span className="mt-1 text-red-400 text-xs">
                This field is required
              </span>
            )}
          </div>
          {hasError.isVisible && (
            <div className="flex justify-center text-red-400 text-sm">
              <span>Uppp... there is a problem</span>
            </div>
          )}
          {isLoading ? (
            <div className="flex flex-col items-center">
              <svg
                className="svg-container"
                height="30"
                width="30"
                viewBox="0 0 100 100"
              >
                <circle
                  className="loader-svg bg"
                  cx="50"
                  cy="50"
                  r="45"
                ></circle>
                <circle
                  className="loader-svg animate"
                  cx="50"
                  cy="50"
                  r="45"
                ></circle>
              </svg>
              <span className="mt-1 text-sm">Saving information...</span>
            </div>
          ) : (
            <div className="flex justify-center mt-3.5">
              <input
                className="bg-indigo-600 p-2.5 rounded text-white"
                type="submit"
                value="Save"
              />
              <button
                type="button"
                onClick={closeModalAddCustomer}
                className="bg-red-400 ml-10 p-2 rounded text-white"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </Modal>
  );
};

export default ModalAddCustomer;

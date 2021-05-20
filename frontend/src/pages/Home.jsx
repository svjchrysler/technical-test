import React, { useEffect, useState } from "react";
import List from "../components/List";
import CustomerService from "../services/api/CustomerService";
import Loading from "../components/Loading";
import ReactPaginate from "react-paginate";
import ModalError from "../components/ModalError";
import ModalAddCustomer from "../components/ModalAddCustomer";
import iconAdd from "../add.svg";

const Home = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleModalCustomer, setIsVisibleModalCustomer] = useState(false);
  const [hasError, setHasError] = useState({ isVisible: false, message: "" });
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    getCustomers(1);
  }, []);

  const getCustomers = (page) => {
    setIsLoading(true);
    CustomerService.getCustomers(page)
      .then((response) => {
        setCustomers(response.data);
        setPageCount(Math.ceil(response.total / 10));
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

  const handlePageClick = (data) => {
    getCustomers(data.selected + 1);
  };

  const onCloseModal = () => {
    setHasError({ isVisible: false });
  };

  const closeModalAddCustomer = () => {
    setIsVisibleModalCustomer(false);
  };

  const openModalAddCustomer = () => {
    setIsVisibleModalCustomer(true);
  };

  const saveCustomer = () => {
    closeModalAddCustomer();
    getCustomers(1);
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <List data={customers} />
      <Loading visible={isLoading} message="Getting Information" />
      {customers.length > 0 && (
        <div className="pagination w-2/3">
          <ReactPaginate
            previousLabel="Anterior"
            nextLabel="Siguiente"
            pageCount={pageCount}
            onPageChange={handlePageClick}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            activeClassName={"active"}
          />
        </div>
      )}
      <ModalError visible={hasError.isVisible} onCloseModal={onCloseModal} />
      <ModalAddCustomer
        visible={isVisibleModalCustomer}
        closeModalAddCustomer={closeModalAddCustomer}
        saveCustomer={saveCustomer}
      />
      <button
        onClick={openModalAddCustomer}
        className="bg-red-400 bottom-12 fixed flex h-16 items-center justify-center right-16 rounded-full w-16"
      >
        <img alt="" className="h-1/2 w-1/2" src={iconAdd} />
      </button>
    </div>
  );
};

export default Home;

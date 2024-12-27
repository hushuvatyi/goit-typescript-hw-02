import { FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";
import { Field, Form, Formik } from "formik";

import styles from "./SearchBar.module.css";

type FormValues = {
  query: string;
};

type Props = {
  onSubmit: (query: string) => void;
};

const initialValues: FormValues = { query: "" };

const SearchBar: React.FC<Props> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        if (!values.query) {
          toast.error("Please enter the value in the search field");
          return;
        }
        onSubmit(values.query);
        actions.resetForm();
      }}
    >
      <Form className={styles.searchForm}>
        <Field
          className={styles.searchInput}
          name="query"
          type="search"
          autoComplete="off"
          autoFocus
          placeholder="Write what would you like to see..."
        />
        <button className={styles.btn} type="submit">
          <FiSearch size="20px" />
        </button>
      </Form>
    </Formik>
  );
};

export default SearchBar;

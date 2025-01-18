import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../redux/contactsOps";
import s from "./ContactList.module.css";

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);
  const loading = useSelector((state) => state.contacts.loading);
  const error = useSelector((state) => state.contacts.error);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (loading) {
    return <p>Loading contacts...</p>;
  }

  if (error) {
    return <p>Error loading contacts: {error}</p>;
  }

  if (!Array.isArray(contacts)) {
    return <p>No contacts available.</p>;
  }
  return (
    <ul className={s.contact_list}>
      {contacts.map(({ id, name, phone }) => (
        <li className={s.contact_item} key={id}>
          {name}: {phone}
        </li>
      ))}
    </ul>
  );
};

export default ContactList;

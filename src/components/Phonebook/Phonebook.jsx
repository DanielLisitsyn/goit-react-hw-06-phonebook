import { useSelector, useDispatch } from 'react-redux';

import PhonebookBlock from 'components/PhonebookBlock/PhonebookBlock';
import PhonebookList from '../PhonebookList/PhonebookList';
import PhonebookForm from 'components/PhonebookForm/PhonebookForm';
import css from './Phonebook-module.css';

import { addContact, deleteContact } from 'redux/contacts/contacts-slice';
import { setFilter } from '../../redux/filter/filter-slice';
import {
  getContacts,
  getFilteredContacts,
} from '../../redux/contacts/contacts-selectors';
import { getFilter } from '../../redux/filter/filter-selectors';

const Phonebook = () => {
  const contacts = useSelector(getContacts);
  const filteredContacts = useSelector(getFilteredContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const handleFilterChange = ({ target }) => {
    dispatch(setFilter(target.value));
  };

  const onAddContacts = ({ name, number }) => {
    if (isDublicate({ name, number })) {
      return alert(`${name} is already in contacts`);
    }
    dispatch(addContact({ name, number }));
  };

  const isDublicate = ({ name }) => {
    const normalizedName = name.toLowerCase();
    const dublicate = contacts.find(contact => {
      return contact.name.toLowerCase() === normalizedName;
    });
    return Boolean(dublicate);
  };

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={css.wrapper}>
      <div className={css.block}>
        <PhonebookBlock title="Phonebook">
          <PhonebookForm onSubmit={onAddContacts} />
        </PhonebookBlock>

        <PhonebookBlock title="Contacts">
          <p className={css.filterTitel}>Find contacts by name</p>
          <input
            name="filter"
            onChange={handleFilterChange}
            value={filter}
            type="text"
          />
          <PhonebookList
            contacts={filteredContacts}
            onDeleteContact={onDeleteContact}
          />
        </PhonebookBlock>
      </div>
    </div>
  );
};

export default Phonebook;

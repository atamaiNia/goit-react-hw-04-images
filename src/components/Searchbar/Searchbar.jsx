import { useState } from 'react';
import { ToastError } from 'components/Notification/ToastError';
import { ImSearch } from 'react-icons/im';
import { StyledSearchbar, Form, Btn, Input } from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleQueryChange = e => {
    console.log(e.currentTarget.value);
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      return ToastError('Enter something to start searching');
    }
    onSubmit(query);
    console.log(query);
    setQuery('');
  };

  return (
    <StyledSearchbar>
      <Form onSubmit={handleSubmit}>
        <Btn type="submit">
          <ImSearch style={{ fontSize: 18 }} />
        </Btn>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleQueryChange}
        />
      </Form>
    </StyledSearchbar>
  );
}

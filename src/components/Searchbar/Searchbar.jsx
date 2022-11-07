import { Component } from 'react';
import { ToastError } from 'components/Notification/ToastError';
import { ImSearch } from 'react-icons/im';
import { StyledSearchbar, Form, Btn, Input } from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  handleQueryChange = e => {
    console.log(e.currentTarget.value);
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    const { query } = this.state;
    e.preventDefault();
    if (query.trim() === '') {
      return ToastError('Enter something to start searching');
    }
    this.props.onSubmit(query);
    console.log(query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    const { handleQueryChange, handleSubmit } = this;
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
}

import {render, screen} from '@testing-library/react';
import {UserCard} from './01-function-component-props';

test('renders user name', () => {
  render(<UserCard name="Sumit" role="Developer" />);

  expect(screen.getByText('Sumit')).toBeInTheDocument();
});


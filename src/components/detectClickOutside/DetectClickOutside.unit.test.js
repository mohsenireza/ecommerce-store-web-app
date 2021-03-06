import { render, screen } from '../../test/utils/utils';
import { DetectClickOutside } from './DetectClickOutside';

test('should detect click outside of the component', async () => {
  // Declare component props
  const onClickOutside = jest.fn();

  // Render the component
  const { user } = await render(
    <div>
      <button>outside</button>
      <DetectClickOutside onClickOutside={onClickOutside}>
        <button>inside</button>
      </DetectClickOutside>
    </div>
  );

  // Click once inside and once outside of the DetectClickOutside component
  await user.click(screen.getByRole('button', { name: 'inside' }));
  await user.click(screen.getByRole('button', { name: 'outside' }));

  // onClickOutside function should be called just once
  expect(onClickOutside).toBeCalledTimes(1);
});

test('should accept a class for its container element', async () => {
  // Declare component props
  const onClickOutside = jest.fn();
  const className = 'detectClickOutside__container';

  // Render the component
  await render(
    <DetectClickOutside className={className} onClickOutside={onClickOutside}>
      <button>inside</button>
    </DetectClickOutside>
  );

  // Container element of DetectClickOutside should have the given class
  expect(screen.getByTestId('detectClickOutsideContainer')).toHaveClass(
    className
  );
});

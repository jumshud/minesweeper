import React from 'react';
import Enzyme,{ shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Cell, {CellProps} from '../Cell';

Enzyme.configure({
    adapter: new Adapter(),
});

let wrapper: any;
let openCell = jest.fn();
const props: CellProps = {
    value: '1',
    openCell: openCell,
    x: 0,
    y: 0,
    disabled: false,
    level: 1
};

describe('Cell component', () => {
    beforeEach(() => {
        openCell.mockClear();
    });

    test.each([[0, 0, true], [1, 1, true], [1, 2, false]])(
        'check classes depend on x&y params',
        (x, y, expected) => {
            let _props: CellProps = Object.assign(props, {
                x: x,
                y: y
            });
            let classes: string = expected ? 'cell light' : 'cell';

            wrapper = shallow(<Cell {..._props} />);
            expect(wrapper.props().disabled).toBeFalsy();
            expect(wrapper.hasClass(classes)).toBeTruthy();
            expect(wrapper.find('button').hasClass('light')).toBe(expected);
        }
    );

    test('click openCell button', () => {
        wrapper = shallow(<Cell {...props} />);
        const button = wrapper.find('button');
        button.simulate('click', { currentTarget: () => undefined });
        expect(openCell).toBeCalledTimes(1);
        expect(openCell).toBeCalledWith(
            expect.any(Number),
            expect.any(Number)
        );
    });

    test('button text', () => {
        wrapper = shallow(<Cell {...props} />);
        expect(wrapper.find('button').text()).toBe('1');
    });

});
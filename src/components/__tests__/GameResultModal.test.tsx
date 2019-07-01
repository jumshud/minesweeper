import React from 'react';
import Enzyme,{ shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GameResultModal, {GameResultModalProps} from '../GameResultModal';
import {StatusTypes} from "../../containers/MinesweeperGame";

Enzyme.configure({
    adapter: new Adapter(),
});

let wrapper: any;
let closeModal = jest.fn();
let playAgain = jest.fn();
let changeLevel = jest.fn();
const props: GameResultModalProps = {
    showModal: false,
    status: StatusTypes.New,
    level: 1,
    closeModal: closeModal,
    playAgain: playAgain,
    changeLevel: changeLevel
};

describe('GameResultModal component', () => {
    beforeEach(() => {
        closeModal.mockClear();
        playAgain.mockClear();
        changeLevel.mockClear();
    });

    test('check default UI', () => {
        wrapper = shallow(<GameResultModal {...props} />);
        expect(wrapper.props().dialogClassName).toEqual('modal-sm');
        expect(wrapper.props().visible).toBeFalsy();

        const h4 = wrapper.find('h4');
        expect(h4.hasClass('text-success mb-3')).toBeTruthy();
        expect(h4.text()).toBe("");
        expect(wrapper.find('.btn').length).toBe(2);
        expect(wrapper.find('.btn').first().text()).toBe('Try again');
        expect(wrapper.find('.btn').last().text()).toBe('Next level');
    });

    test('Play again button click',() => {
        let _props: GameResultModalProps = Object.assign(props, {
            level: 2,
            status: StatusTypes.Won
        });
        wrapper = shallow(<GameResultModal {..._props} />);
        let playAgainBtn = wrapper.find('.btn').first();
        expect(playAgainBtn.text()).toBe('Play again');
        expect(wrapper.find('h4').text()).toBe("You won!");
        playAgainBtn.simulate('click');
        expect(playAgain).toBeCalledTimes(1);
    });

    test('Next level button click',() => {
        let _props: GameResultModalProps = Object.assign(props, {
            level: 2,
            status: StatusTypes.Lose
        });
        wrapper = shallow(<GameResultModal {..._props} />);
        let nextLevelBtn = wrapper.find('.btn').last();
        expect(wrapper.find('h4').text()).toBe("You lose!");
        nextLevelBtn.simulate('click');
        expect(changeLevel).toBeCalledWith(3);
        expect(changeLevel).toBeCalledTimes(1);
    });

});
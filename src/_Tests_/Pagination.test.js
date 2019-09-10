import Pagination from '../Components/Pagination'
import React from 'react'
import {shallow, configure, debug, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DisplayComponent from '../Components/DisplayComponent'

configure({adapter: new Adapter()});

const paginatedData = [
    {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    },
    {
    "userId": 1,
    "id": 3,
    "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    },
]

const mock = jest.mock('../Components/DisplayComponent', () => () => 'DisplayComponent');

describe('Pagination Buttons Behave As Expected', () => {

    test('Handle click is fired on nextPage click', () => {
        let wrapper = shallow(<Pagination  data={paginatedData} totalRecords={3} recordsPerPage={1} range={1}>{mock}</Pagination>);
        wrapper.instance().handleClick = jest.fn();
        wrapper.instance().forceUpdate();
        expect(wrapper.instance().handleClick).not.toHaveBeenCalled();
        wrapper.find({name: 'nextPage'}).simulate('click');
        expect(wrapper.instance().handleClick).toHaveBeenCalled();
        wrapper.find({name: 'nextPage'}).simulate('click');
        expect(wrapper.instance().handleClick).toHaveBeenCalledTimes(2);
        wrapper.unmount();
    });

    test('Handle click is fired on firstPage click', () => {
        let wrapper = shallow(<Pagination  data={paginatedData} totalRecords={3}  recordsPerPage={1} range={1}>{mock}</Pagination>);
        wrapper.instance().handleClick = jest.fn();
        wrapper.instance().forceUpdate();
        expect(wrapper.instance().handleClick).not.toHaveBeenCalled();
        wrapper.find({name: 'firstPage'}).simulate('click');
        expect(wrapper.instance().handleClick).toHaveBeenCalled();
        wrapper.find({name: 'firstPage'}).simulate('click');
        expect(wrapper.instance().handleClick).toHaveBeenCalledTimes(2);
        wrapper.unmount();
    });

    test('Handle click is fired on previousPage click', () => {
        let wrapper = shallow(<Pagination  data={paginatedData} totalRecords={3}  recordsPerPage={1} range={1}>{mock}</Pagination>);
        wrapper.instance().handleClick = jest.fn();
        wrapper.instance().forceUpdate();
        expect(wrapper.instance().handleClick).not.toHaveBeenCalled();
        wrapper.find({name: 'previousPage'}).simulate('click');
        expect(wrapper.instance().handleClick).toHaveBeenCalled();
        wrapper.find({name: 'previousPage'}).simulate('click');
        expect(wrapper.instance().handleClick).toHaveBeenCalledTimes(2);
        wrapper.unmount();
    });

    test('Handle click is fired on lastPage click', () => {
        let wrapper = shallow(<Pagination  data={paginatedData} totalRecords={3}  recordsPerPage={1} range={1}>{mock}</Pagination>);
        wrapper.setState({ lastPage: 3 });
        wrapper.instance().handleClick = jest.fn();
        wrapper.instance().forceUpdate();
        expect(wrapper.instance().handleClick).not.toHaveBeenCalled();
        wrapper.find({name: 'lastPage'}).simulate('click');
        expect(wrapper.instance().handleClick).toHaveBeenCalled();
        wrapper.find({name: 'lastPage'}).simulate('click');
        expect(wrapper.instance().handleClick).toHaveBeenCalledTimes(2);
        wrapper.unmount();
    });

    test('nextPage click increases page', () => {
        let wrapper = shallow(<Pagination  data={paginatedData} totalRecords={3}  recordsPerPage={1} range={1}>{mock}</Pagination>);
        wrapper.setState({ lastPage: 3 });
        expect(wrapper.state('currentPage')).toBe(1);
        wrapper.find({name: 'nextPage'}).simulate('click', {currentTarget: { name: 'nextPage'}});
        expect(wrapper.state('currentPage')).toBe(2);
        wrapper.find({name: 'nextPage'}).simulate('click', {currentTarget: { name: 'nextPage'}});
        expect(wrapper.state('currentPage')).toBe(3);
        wrapper.find({name: 'nextPage'}).simulate('click', {currentTarget: { name: 'nextPage'}});
        expect(wrapper.state('currentPage')).toBe(3);
        wrapper.unmount();
    });

    test('previousPage click decreases page', () => {
        let wrapper = shallow(<Pagination  data={paginatedData} totalRecords={3}  recordsPerPage={1} range={1}>{mock}</Pagination>);
        wrapper.setState({ currentPage: 3 });
        expect(wrapper.state('currentPage')).toBe(3);
        wrapper.find({name: 'previousPage'}).simulate('click', {currentTarget: { name: 'previousPage'}});
        expect(wrapper.state('currentPage')).toBe(2);
        wrapper.find({name: 'previousPage'}).simulate('click', {currentTarget: { name: 'previousPage'}});
        expect(wrapper.state('currentPage')).toBe(1);
        wrapper.find({name: 'previousPage'}).simulate('click', {currentTarget: { name: 'previousPage'}});
        expect(wrapper.state('currentPage')).toBe(1);
        wrapper.unmount();
    });

    test('firstPage click takes you to first page', () => {
        let wrapper = shallow(<Pagination  data={paginatedData} totalRecords={3} recordsPerPage={1} range={1}>{mock}</Pagination>);
        wrapper.setState({ currentPage: 3 });
        expect(wrapper.state('currentPage')).toBe(3);
        wrapper.find({name: 'firstPage'}).simulate('click', {currentTarget: { name: 'firstPage'}});
        expect(wrapper.state('currentPage')).toBe(1);
        wrapper.find({name: 'firstPage'}).simulate('click', {currentTarget: { name: 'firstPage'}});
        expect(wrapper.state('currentPage')).toBe(1);       
        wrapper.unmount();
    });

    test('lastPage click takes you to last page', () => {
        let wrapper = shallow(<Pagination  data={paginatedData} totalRecords={3}  recordsPerPage={1} range={1}>{mock}</Pagination>);
        wrapper.setState({ lastPage: 3 });
        expect(wrapper.state('currentPage')).toBe(1);
        wrapper.find({name: 'lastPage'}).simulate('click', {currentTarget: { name: 'lastPage'}});
        expect(wrapper.state('currentPage')).toBe(3);
        wrapper.find({name: 'lastPage'}).simulate('click', {currentTarget: { name: 'lastPage'}});
        expect(wrapper.state('currentPage')).toBe(3);       
        wrapper.unmount();
    });

    test('Handleclick is fired on page number click', () => {
        let wrapper = shallow(<Pagination  data={paginatedData} totalRecords={3}  recordsPerPage={1} range={1}>{mock}</Pagination>);
        wrapper.setState({ lastPage: 3});
        wrapper.instance().handleClick = jest.fn();
        wrapper.instance().forceUpdate();
        expect(wrapper.instance().handleClick).not.toHaveBeenCalled();
        wrapper.find({name: 'value1'}).simulate('click');
        expect(wrapper.instance().handleClick).toHaveBeenCalled();
        wrapper.find({name: 'value1'}).simulate('click');
        expect(wrapper.instance().handleClick).toHaveBeenCalledTimes(2);
        wrapper.unmount();
    });

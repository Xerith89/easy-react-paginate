import BaseComponent from '../Components/BaseComponent'
import React from 'react'
import {shallow, configure, debug } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

beforeAll(() => {
    global.fetch = jest.fn();
});

const spyDidMount = jest.spyOn(BaseComponent.prototype,"componentDidMount");

describe('Component Retrieves Data From API', () => {
    test('should load post data', () => {
        let wrapper = shallow(<BaseComponent />, {disableLifecycleMethods: true});
        fetch.mockImplementation(() => {
            return Promise.resolve({
                status:200,
                json: () => {
                    return Promise.resolve({
                        userId: 1,
                        id: 1,
                        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
                    });
                }
            });
        });

        expect(spyDidMount).toHaveBeenCalled();
      
       
            wrapper.update();
            console.log(wrapper.state());
            expect(wrapper.state().title).toBe("sunt aut facere repellat provident occaecati excepturi optio reprehenderit");
            expect(wrapper.state().body).toBe("quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto");
    
            spyDidMount.mockRestore();
            fetch.mockClear();
            done();
        
    });
});


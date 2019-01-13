import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

if (global.document) {
    document.createRange = () => ({
        setStart: () => { },
        setEnd: () => { },
        commonAncestorContainer: {
            nodeName: 'BODY',
            ownerDocument: document,
        },
    });
}

configure({ adapter: new Adapter() });

window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
};
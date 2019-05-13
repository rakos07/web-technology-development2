import exports from './exports';
import register from './register';

class PageFunction {

    customerView() {
        register.handleViewAction({
            actionType: exports.CUSTOMER,
            payload: null
        })
    }
}


export default new PageFunction();
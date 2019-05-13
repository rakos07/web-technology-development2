import React from 'react';
import customerFunction from "./customerFunction"
import pageFunction from "./pageFunction"

class App extends React.Component {

    componentDidMount(){
        pageFunction.customerView();
        customerFunction.fetchOrders();

    }

    render(){
    return (

        <div id="mainDiv">
            <div>
                <header>
                    <div>
                        <div>
                            <div onClick={() => {
                                pageFunction.customerView();
                                customerFunction.fetchOrders();
                            }}>Vásárló
                            </div>
                        </div>
                    </div>
                </header>
                <div id="bodyDiv">
                    <div>
                        <div id="upperRow">
                            <div id="formDiv"></div>
                            <div id="manager_invoice_panel"></div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div id="orderListTable"></div>
                            <div id="work_details"></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )}
}



export default App;

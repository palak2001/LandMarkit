import React from 'react';





export default class Home extends React.Component{

    render() {
        return (
            <div>
                <div>
                    <a style="float: right;" data-target="#get_started" data-toggle="modal">Get Started</a>
                    <div class="modal" id="get_started">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h3 class="text-primary" id="text-primary" >Location</h3>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>
                            <div class="modal-body" id="body-modal"> 
                                <input type="number" placeholder="Pincode" id="pincode"/>
                                </div>
                        </div>
                    </div>
                </div>
                <div id="properties"></div>
                </div>
            </div>
        );
    }
}
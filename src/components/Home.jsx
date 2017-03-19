import React, { Component } from 'react';

export default class Home extends Component {
  componentDidMount () {
    initMap();
  }

  render () {
    return (
      <div>
        <div className='container'>
          <div id='map' />
        </div>

        <div className='modal left fade' id='myModal' tabIndex='-1' role='dialog' aria-labelledby='myModalLabel'>
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>

              <div className='modal-header'>
                <button type='button' className='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
                <h4 className='modal-title' id='myModalLabel'>Left Sidebar</h4>
              </div>

              <div className='modal-body'>
                <p>Anim pariatur cliche reprehenderit, enim eiusmod
                  high life accusamus terry richardson ad squid. 3
                  wolf moon officia aute, non cupidatat skateboard
                  dolor brunch. Food truck quinoa nesciunt laborum
                  eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put
                  a bird on it squid single-origin coffee nulla
                  assumenda shoreditch et. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred
                  nesciunt sapiente ea proident. Ad vegan excepteur
                  butcher vice lomo. Leggings occaecat craft beer
                  farm-to-table, raw denim aesthetic synth nesciunt
                  you probably haven't heard of them accusamus labore
                  sustainable VHS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';

export default class Register extends Component {
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-offset-5 col-md-3'>
            <div className='form-login'>
              <h4>Register for BoxHero.</h4>
              <form>
                <label>
                  <input type='text' id='userName' className='form-control input-sm chat-input' placeholder='username' />
                  <input type='text' id='userEmail' className='form-control input-sm chat-input' placeholder='email' />
                  <input type='text' id='userName' className='form-control input-sm chat-input' placeholder='password' />
                </label>

                <div className='wrapper'>
                  <span className='group-btn'>
                    <a type='submit' className='btn btn-primary btn-md'>Login <i className='fa fa-sign-in' /></a>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

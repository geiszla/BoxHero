import React, { Component } from 'react';

export default class Signup extends Component {
  render () {
    return (
      <div>
        <div className='container'>
          <div className='jumbotron'>
            <h1>AN OUTDOOR GAME FOR ALL AGES</h1>
            <h3> Introducing box hero - another reason to have fun regardless of the weather</h3>
          </div>
        </div>

        <div className='container' id='firstStep'>
          <img id='exampleMap' src='images/blueMap.png' />
          <h2> How to become a box hero </h2>
          <h3> Step 1: Create a free account</h3>
          <p> Sign up with us to see boxes near you, and when you're ready <br />
              place boxes of your own </p>
        </div>

        <div className='container' id='secondStep'>
          <img id='exampleBox' src='images/box2.png' />
          <h3> Step 2: Select a box to find</h3>
          <p> Pick a box to find and use its general location to begin your search </p>
        </div>

        <div className='container' id='thirdStep'>
          <img id='exampleQBox' src='images/QBox.png' />
          <h3> Step 3: Tell us what's in the box</h3>
          <p> When you find it, simply give us its id and reap all the glory</p>
        </div>

        <div className='container' id='SignUp'>
          <h1 >What are you waiting for? </h1>
          <p><a className='btn btn-lg btn-success' href='#' role='button' data-toggle='modal' data-target='#signUp-modal'>Sign up now</a></p>
        </div>

        <div className='container' id='forms'>
          <div className='modal fade' id='login-modal' role='dialog'>
            <div className='modal-dialog'>

              <div className='modal-content'>
                <div className='modal-header'>
                  <button type='button' className='close' data-dismiss='modal'>&times;</button>
                  <h4 className='modal-title'>Log In</h4>
                </div>
                <div className='modal-body'>
                  <form action=''>
                    <input type='text' id='login_username' placeholder='Username' name='uname' required />
                    <input type='password' id='login_password' placeholder='Password' name='psw' required />

                    <div className='form-help'>
                      <input type='checkbox' /> Remember me
                      <a href='#' id='forgotPass'> Forgot password?</a>
                    </div>

                    <div id='logInButton'>
                      <button type='submit' className='btn btn-success btn-lg btn-block'>Login</button>
                    </div>

                  </form>
                </div>
                <div className='modal-footer'>
                  <button type='button' className='btn btn-default' id='LogInSignUp' data-dismiss='modal'>Sign up</button>
                  <p id='noAccount'> Don't have an account? </p>
                </div>
              </div>

            </div>
          </div>

          <div className='modal fade' id='signUp-modal' role='dialog'>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <button type='button' className='close' data-dismiss='modal'>&times;</button>
                  <h4 className='modal-title'>Sign Up</h4>
                </div>
                <div className='modal-body'>
                  <form action=''>
                    <label><b>Email</b></label>
                    <input type='email' id='login_email' placeholder='email' name='email' required />
                    <label><b>Username</b></label>
                    <input type='text' id='login_username' placeholder='Username' name='uname' required />
                    <label><b>Password</b></label>
                    <input type='password' id='login_password' placeholder='Password' name='psw' required />

                    <div className='form-terms'>
                      <input type='checkbox0' /> I agree to the <a href='#' id='termsOfUse'> Terms of Use </a>  & <a href='#' id='privacyPolicy'> Privacy Policy </a>
                    </div>

                    <div id='signUpButton'>
                      <button type='submit' className='btn btn-success btn-lg btn-block'>Sign Up</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

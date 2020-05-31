import React from 'react';
import './auth.css';

export default class Auth extends React.Component {
    constructor() {
        super();
        this.state = {
          toggleLogin: true,
          toggleRegister: false,
          username: '',
          password: ''
        }
    }

    toggleLogin = () => {
      this.setState(() => ({
          toggleLogin: true,
          toggleRegister: false
      }));
    }

    toggleRegister = () => {
      this.setState(() => ({
          toggleLogin: false,
          toggleRegister: true
      }));
    }

    handleSubmit = () => {
      this.props.onAuthenticateInput(this.state.username, this.state.password);
    }
    
    render() {
        return (
          <div className='container'>
            <div className='tabs'>
            <ul>
              <li className={this.state.toggleLogin ? 'is-active' : null}><a href='#' onClick={this.toggleLogin}>Login</a></li>
              <li className={this.state.toggleRegister ? 'is-active' : null}><a href='#' onClick={this.toggleRegister}>Register</a></li>
          </ul>
          </div>
          { this.state.toggleLogin && <div>
            <div className='field'>
              <label className='label'>Username</label>
              <div>
                <input className='input' value={this.state.username} onChange={(e) => this.setState({username: e.target.value})}  type='text' placeholder='Username'/>
              </div>
            </div>
            <div className='field'>
              <label className='label'>Password</label>
              <div>
                <input className='input' value={this.state.password}onChange={(e) => this.setState({password: e.target.value})} type='password' placeholder='Password'/>
              </div>
            </div>
            <div className='field'>
              <p className='control'>
                <button onClick={this.handleSubmit} className='button is-info is-outlined'>
                  Login
                </button>
              </p>
          </div>
          </div>
          }
          { this.state.toggleRegister && <div>
            <div className='field'>
              <label className='label'>Username</label>
              <div>
                <input className='input' value={this.state.username} onChange={(e) => this.setState({username: e.target.value})} type='text' placeholder='Username'/>
              </div>
            </div>
            <div className='field'>
              <label className='label'>Password</label>
              <div>
                <input className='input' value={this.state.password}onChange={(e) => this.setState({password: e.target.value})} type='password' placeholder='Password'/>
              </div>
            </div>
            <div className='field'>
              <p className='control'>
                <button className='button is-info is-outlined'>
                  Register
                </button>
              </p>
          </div>
          </div>
          }
        </div>
        );
    }
}

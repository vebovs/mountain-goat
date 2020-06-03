import React from 'react';

export default class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
          togglePanel: true,
          toggleLogout: false,
          username: '',
          password: ''
        }
    }

    togglePanel = () => {
      this.setState(() => ({
          togglePanel: true,
          toggleLogout: false
      }));
    }

    toggleLogout = () => {
      this.setState(() => ({
          togglePanel: false,
          toggleLogout: true
      }));
    }
    
    render() {
        return (
          <div className='container'>
            <div className='tabs'>
            <ul>
              <li className={this.state.togglePanel ? 'is-active' : null}><a href='#' onClick={this.togglePanel}>Panel</a></li>
              <li className={this.state.toggleLogout ? 'is-active' : null}><a href='#' onClick={this.toggleLogout}>Logout</a></li>
          </ul>
          </div>
          { this.state.togglePanel && <div>
            {this.props.children}
          </div>
          }
          { this.state.toggleLogout && <div>
            <div className='field'>
              <p className='control'>
                <button onClick={this.props.onClick} className='button is-info is-outlined'>
                  Logout
                </button>
              </p>
          </div>
          </div>
          }
        </div>
        );
    }
}

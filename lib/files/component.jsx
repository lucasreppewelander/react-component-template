import React, { Component } from 'react';
import './__tpl_name__.__tpl_cfg_css__';

class __tpl_name__ extends Component {

  render() {
    return (
        <div>
            <h2>Current module: __tpl_name__</h2>
        </div>
    );
  }
}

__tpl_name__.propTypes = {
    // prop: React.PropTypes.[type of property (object,bool,string,func)]
};

export default __tpl_name__;
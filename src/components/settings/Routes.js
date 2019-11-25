import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ManageCurrencyPage from './pages/manageCurrency';
import ManageRatingsPage from './pages/manageRatings';
import SettingComponent  from './setting.component';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/setting/' exact component={SettingComponent} />
        <Route path='/setting/setting' component={SettingComponent} />
        <Route path='/setting/manageCurrency' component={ManageCurrencyPage} />        
        <Route path='/setting/manageRatings' component={ManageRatingsPage} />        
      </Switch>
    );
  }
}

export default Routes;

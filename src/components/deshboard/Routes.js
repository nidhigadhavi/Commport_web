import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import AddEmployeePage from './pages/employee/AddEmployeePage';
import { ShowEmployeePage } from './pages/employee/ShowEmployeePage';
import { SalaryReviewPlan } from './pages/compensastionPlan/SalaryReviewPlanPage';
import { DesignCompensastionPlan } from './pages/compensastionPlan/DesignCompensastionPlan';
import NotFoundPage from '../NotFoundPage';
import { BasicSalaryRule } from './pages/compensastionPlan/BasicSalaryRule';
import { SalaryReviewGridPage } from './pages/compensastionPlan/SalaryReviewGridPage';
import { AnualSalaryReviewPlanRule } from './pages/compensastionPlan/AnualSalaryReviewPlanRule';
import { ExistingPlan } from './pages/compensastionPlan/ExistingPlan';
import {  NewSalaryReviewPlanRule } from './pages/compensastionPlan/NewSalaryReviewPlanRule';
import { ViewSalaryRuleDetail } from './pages/compensastionPlan/ViewSalaryRuleDetail';
import { BudgetAllocation } from './pages/compensastionPlan/BudgetAllocation';


class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/dashboard/' exact component={DashboardPage} />
        <Route path='/dashboard/dashboard' component={DashboardPage} />
        <Route path='/dashboard/addEmployee' component={AddEmployeePage} />
        <Route path='/dashboard/showEmployee' component={ShowEmployeePage} />
        <Route path='/dashboard/salryReviewPlan' component={DesignCompensastionPlan} />
        <Route path='/dashboard/pleaseSubscribe' component={NotFoundPage} />
        <Route path='/dashboard/designCompensastionPlan' component={DesignCompensastionPlan} />        
        <Route path='/dashboard/useExistingPaln' component={ExistingPlan} />
        <Route path='/dashboard/basicRule' component={BasicSalaryRule} />
        <Route path='/dashboard/salaryReviewGrid' component={SalaryReviewGridPage} />
        <Route path='/dashboard/annualSalaryReviewPlanRule' component={AnualSalaryReviewPlanRule} />
        <Route path='/dashboard/createAnnualSalaryReviewPlanRule' component={NewSalaryReviewPlanRule} />        
        <Route path='/dashboard/viewSalaryRuleDetail' component={ViewSalaryRuleDetail} />
        <Route path='/dashboard/salaryReviewGridWithBudget' component={BudgetAllocation} />
        
      </Switch>
    );
  }
}

export default Routes;

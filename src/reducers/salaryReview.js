/**
 * Author : Nidhi Gahdvi
 * purpose : File to setup salary rule 
 */
import _ from 'lodash';

export const salaryReview = (state = { salaryPlanDetail: {}, flagForTargetSet: false }, action) => {
  console.log("REDUCER...");
  switch (action.type) {
    case 'SET_PLAN_DETAIL':
      let currentStateDetail = state;
      currentStateDetail.salaryPlanDetail = action.payload;
      return currentState;

    case 'ERROR_FAIL':
      console.log("into fail..");
      console.log(action);

    case 'SAVE_FILTERS':
      console.log("into the save filters");
      let detail = state;
      detail.setFilters = 0
      return detail;

    case 'GET_PLAN_DETAIL':
      return state;

    case 'SET_FLEG_TARGET_POPULATION':
      let currentStateVal = state;
      currentStateVal.flagForTargetSet = action.flag;
      return currentStateVal;

    case 'GET_FLEG_TARGET_POPULATION':
      return state.flagForTargetSet;

    case 'GET_RULE_WISE_DETAIL':
      console.log("inot reducer...");
      console.log(action);
      return state.ruleWiseDetail = action.payload

    case 'SET_TARGETPOPULATION_REQUEST':
      let currentState = state;
      currentState.targetPopulation = action.payload;
      return currentState;

    case 'ALL_RULE_FILTERS':
      let x = state;
      x.allRuleFilters = action.filters;
      console.log("ALL RULE FILTER.... into the reducers..");
      console.log(state);
      return state;

    case 'BUSINESS_ELE':
      let StateBusinessEle = state;      
      let container = [];
      _.forEach(action.filters, (val, index) =>{
          container.push({ 'value': val.ba_name,  'label': val.display_name, 'name': val.display_name, 'id':val.business_attribute_id});
      })            
      StateBusinessEle.businessEle = container;
      return StateBusinessEle;

    case 'MARKET_ELE':
      let StateMarketEle = state;       
      let containerMarketEle = [];      
      _.forEach(action.filters, (val, index) =>{
        containerMarketEle.push({ 'value': val.ba_name,  'label': val.display_name, 'name': val.display_name, 'id':val.business_attribute_id});
      })          
      StateMarketEle.marketEle = containerMarketEle;
      return StateMarketEle;


    default:
      return state
  }
}
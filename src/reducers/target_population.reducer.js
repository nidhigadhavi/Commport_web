/**
 * Author : Nidhi Gadhavi
 * Purpose : Target Population Reducers for target population state setup
 */

import { targetPopulationConstants } from '../constants/target_population.constant';

export function target_population(state = {}, action) {
    
    switch (action.type) {
        case 'SET_TARGETPOPULATION_REQUEST':    
             let currentState = state;
             currentState.targetPopulation = action.payload;
             return currentState;

        case 'ALL_RULE_FILTERS': 
            console.log("All Rule filters..");
            console.log(action);
            let x = state;
            x.allRuleFilters = action.staticData.data;
            console.log("ALL RULE FILTER.... into the reducers..");
            console.log(state);
            return state;
            
        default:
            return state
    }


}
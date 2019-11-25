
import { employeeCompansationService } from '../services/compansation.service';


export const setPlan = (planDetail) => dispatch => {
  console.log('inot');
  employeeCompansationService.addSalaryRuleDetail(planDetail).then(
    data => {
      let Response = data.data;
      console.log("response of he api call...");
      console.log(data);
      if (Response.status !== 200) {
        dispatch({
          type: 'ERROR_FAIL',
          payload: data.message
        })
      }
      else {
        dispatch({
          type: 'SET_PLAN_DETAIL',
          payload: data
        })
      }
    },
    error => {
      console.log("Eroor in API call......");
    }

  ).catch(() => {
    console.log("#### into catch block ####");
  })

}

export const getPlan = () => dispatch => {
  console.log("inot th #GET plan funciton");
  dispatch({
    type: 'GET_PLAN_DETAIL'
  })
}

export const saveRuleFilters = (requestBody) => dispatch => {    
  employeeCompansationService.saveSalaryRuleFilters(requestBody).then(
    data => {      
      if (data.statusCode == 200) {
        dispatch({
          type: 'SAVE_FILTERS',
          payload: data
        })
      }
      else {
        dispatch({
          type: 'ERROR_FAIL',
          payload: data.message
        })        
      }
    },
    error => {
      console.log("Eroor in API call......");
    }

  ).catch(() => {
    console.log("#### into catch block ####");
  })

}

export const setFlagTarget = (flag) => dispatch => {
  console.log("inot th #SET plan flag INTO THE ACTIONNNNN....");

  dispatch({
    type: 'SET_FLEG_TARGET_POPULATION',
    flag
  })
}

export const getFlagTarget = () => dispatch => {
  console.log("inot th #GET plan funciton");
  dispatch({
    type: 'GET_FLEG_TARGET_POPULATION'
  })
}

export const getRuleWiseDetail = (ruleId) => dispatch => {
  console.log("##### into Get Rule Wise Detail");
  employeeCompansationService.getRuleWiseDetail(ruleId)
    .then((data) => {
      console.log("into the get rule wise ID.. response");
      if (Response.status !== 200) {
        dispatch({
          type: 'GET_RULE_WISE_DETAIL',
          payload: data
        })
      }

    })
    .catch(() => { console.log("Inot the catch blcok..."); })
}

export const setTargetPopulation = (selectedTarget) => dispatch => {
  dispatch({
      type: 'SET_TARGETPOPULATION_REQUEST',
      selectedTarget
  })
}


export const getAllFilters = () => dispatch => {
  console.log("INTO The all filters get ACTIon..");
  let staticData = {
      "statusCode": 200,
      "status": "success",
      "message": "successful!",
      "data": {
        "empBULevel1": [
          {
            "id": 1,
            "name": "Group"
          }
        ],
        "empBULevel2": [
          {
            "id": 2,
            "name": "Asia"
          },
          {
            "id": 4,
            "name": "EMEA"
          },
          {
            "id": 3,
            "name": "Group"
          },
          {
            "id": 1,
            "name": "USA"
          }
        ],
        "empBULevel3": [
          {
            "id": 2,
            "name": "Asia"
          },
          {
            "id": 4,
            "name": "AsiaPac"
          },
          {
            "id": 3,
            "name": "Group"
          },
          {
            "id": 5,
            "name": "South Europe"
          },
          {
            "id": 1,
            "name": "USA"
          }
        ],
        "empCountry": [
          {
            "id": 2,
            "name": "India"
          },
          {
            "id": 3,
            "name": "Turkey"
          },
          {
            "id": 1,
            "name": "US"
          }
        ],
        "empCity": [
          {
            "id": 2,
            "name": "Delhi"
          },
          {
            "id": 4,
            "name": "Istanbul"
          },
          {
            "id": 3,
            "name": "Mumbai"
          },
          {
            "id": 1,
            "name": "New York"
          },
          {
            "id": 5,
            "name": "Washington"
          }
        ],
        "empFunction": [
          {
            "id": 4,
            "name": "CEO Office"
          },
          {
            "id": 2,
            "name": "Country Manager Office"
          },
          {
            "id": 7,
            "name": "Finance"
          },
          {
            "id": 6,
            "name": "Human Resources"
          },
          {
            "id": 1,
            "name": "Marketing"
          },
          {
            "id": 5,
            "name": "Sales"
          }
        ],
        "empSubFunction": [
          {
            "id": 11,
            "name": "Accounting"
          },
          {
            "id": 4,
            "name": "CEO Office"
          },
          {
            "id": 1,
            "name": "Commercial"
          },
          {
            "id": 14,
            "name": "Compensation"
          },
          {
            "id": 16,
            "name": "Controlling"
          },
          {
            "id": 2,
            "name": "Country Manager Office"
          },
          {
            "id": 19,
            "name": "Development"
          },
          {
            "id": 9,
            "name": "Event Management"
          },
          {
            "id": 15,
            "name": "Finance"
          },
          {
            "id": 13,
            "name": "HR Admin"
          },
          {
            "id": 6,
            "name": "Human Resources"
          },
          {
            "id": 20,
            "name": "Market Access"
          },
          {
            "id": 8,
            "name": "Marketing"
          },
          {
            "id": 17,
            "name": "Marketing Support"
          },
          {
            "id": 18,
            "name": "Payments"
          },
          {
            "id": 12,
            "name": "Payroll"
          },
          {
            "id": 7,
            "name": "Planning"
          },
          {
            "id": 5,
            "name": "Sales"
          },
          {
            "id": 10,
            "name": "Supply Chain"
          }
        ],
        "empSubSubFunction": [
          {
            "id": 11,
            "name": "Accounting"
          },
          {
            "id": 4,
            "name": "CEO Office"
          },
          {
            "id": 1,
            "name": "Commercial"
          },
          {
            "id": 14,
            "name": "Compensation"
          },
          {
            "id": 16,
            "name": "Controlling"
          },
          {
            "id": 2,
            "name": "Country Manager Office"
          },
          {
            "id": 19,
            "name": "Development"
          },
          {
            "id": 9,
            "name": "Event Management"
          },
          {
            "id": 15,
            "name": "Finance"
          },
          {
            "id": 13,
            "name": "HR Admin"
          },
          {
            "id": 6,
            "name": "Human Resources"
          },
          {
            "id": 20,
            "name": "Market Access"
          },
          {
            "id": 8,
            "name": "Marketing"
          },
          {
            "id": 17,
            "name": "Marketing Support"
          },
          {
            "id": 18,
            "name": "Payments"
          },
          {
            "id": 12,
            "name": "Payroll"
          },
          {
            "id": 7,
            "name": "Planning"
          },
          {
            "id": 5,
            "name": "Primary Care"
          },
          {
            "id": 10,
            "name": "Supply Chain"
          }
        ],
        "empDesignation": [
          {
            "id": 14,
            "name": "Accountant"
          },
          {
            "id": 11,
            "name": "Accounts Manager"
          },
          {
            "id": 13,
            "name": "ASSOCIATE PRODUCT MANAGER"
          },
          {
            "id": 4,
            "name": "Chief Executive Officer"
          },
          {
            "id": 2,
            "name": "Country Manager"
          },
          {
            "id": 10,
            "name": "DISTRIBUTION MANAGER "
          },
          {
            "id": 7,
            "name": "Financial Planning Manager"
          },
          {
            "id": 18,
            "name": "Head of Finance"
          },
          {
            "id": 19,
            "name": "Head of HR"
          },
          {
            "id": 8,
            "name": "Head of Marketing"
          },
          {
            "id": 23,
            "name": "HR ADMIN ASSISTANT"
          },
          {
            "id": 6,
            "name": "HR OPERATIONS MANAGER "
          },
          {
            "id": 17,
            "name": "HR SPECIALIST"
          },
          {
            "id": 15,
            "name": "HUMAN RESOURCES ADMINISTRATOR"
          },
          {
            "id": 24,
            "name": "L&D Manager"
          },
          {
            "id": 20,
            "name": "Manager - Internal Controls"
          },
          {
            "id": 25,
            "name": "MARKET ACCESS MANAGER "
          },
          {
            "id": 9,
            "name": "MARKETING COORDINATOR/EVENT MANAGER"
          },
          {
            "id": 21,
            "name": "Marketing Support coordinator"
          },
          {
            "id": 22,
            "name": "Payment Associate"
          },
          {
            "id": 12,
            "name": "Payroll Administrator"
          },
          {
            "id": 16,
            "name": "Planning Analyst"
          },
          {
            "id": 1,
            "name": "PRODUCT MANAGER"
          },
          {
            "id": 5,
            "name": "Sales Representative"
          },
          {
            "id": 26,
            "name": "Sr Sales Representative"
          }
        ],
        "empGrade": [
          {
            "id": 5,
            "name": "1"
          },
          {
            "id": 7,
            "name": "2"
          },
          {
            "id": 1,
            "name": "3"
          },
          {
            "id": 8,
            "name": "4"
          },
          {
            "id": 6,
            "name": "5"
          },
          {
            "id": 2,
            "name": "6"
          },
          {
            "id": 4,
            "name": "8"
          }
        ],
        "empLevel": [
          {
            "id": 11,
            "name": "1A"
          },
          {
            "id": 5,
            "name": "1B"
          },
          {
            "id": 8,
            "name": "2A"
          },
          {
            "id": 12,
            "name": "2B"
          },
          {
            "id": 1,
            "name": "3A"
          },
          {
            "id": 7,
            "name": "3B"
          },
          {
            "id": 10,
            "name": "4A"
          },
          {
            "id": 6,
            "name": "5A"
          },
          {
            "id": 9,
            "name": "5B"
          },
          {
            "id": 2,
            "name": "6A"
          },
          {
            "id": 4,
            "name": "8A"
          }
        ],
        "empEducation": [
          {
            "id": 1,
            "name": "General"
          },
          {
            "id": 5,
            "name": "Graduate"
          },
          {
            "id": 6,
            "name": "MBA"
          },
          {
            "id": 2,
            "name": "Post Graduate"
          },
          {
            "id": 4,
            "name": "Sales Degree"
          }
        ],
        "empIdentifiedTalent": [
          {
            "id": 2,
            "name": "Consistent Star"
          },
          {
            "id": 5,
            "name": "Future Star"
          },
          {
            "id": 4,
            "name": "Growing Potential"
          },
          {
            "id": 1,
            "name": "High Professional"
          },
          {
            "id": 7,
            "name": "Key Contributor"
          },
          {
            "id": 6,
            "name": "Low Performer"
          },
          {
            "id": 9,
            "name": "Professional"
          },
          {
            "id": 8,
            "name": "Skilled"
          }
        ],
        "empCriticalPositionHolder": [
          {
            "id": 4,
            "name": "High"
          },
          {
            "id": 5,
            "name": "Low"
          },
          {
            "id": 2,
            "name": "Medium"
          },
          {
            "id": 1,
            "name": "NA"
          },
          {
            "id": 6,
            "name": "Not Eval"
          }
        ],
        "empPerformanceAchievement": [
          
        ]
      }
    }
    
 
  employeeCompansationService.getRuleFilters()
      .then(
          filters => {
              console.log("INTO The all filters get..");
              console.log(filters);
              dispatch({
                  type: 'ALL_RULE_FILTERS',
                  filters
              })
          },
          error => {
              console.log("Into the Error...");
              console.log(error);
          }
      )
      .catch()
}

export const getBuisnessElements = () => dispatch => {
    console.log("into the get businees element");
    employeeCompansationService.getBuisnessElements()
      .then(
          filters => {
              console.log("INTO The all filters get..");
              console.log(filters);
              dispatch({
                  type: 'BUSINESS_ELE',
                  filters
              })
          },
          error => {
              console.log("Into the Error...");
              console.log(error);
          }
      )
      .catch()
}

export const getMarketSalaryElements = () => dispatch => {
  employeeCompansationService.getMarketSalaryElements()
  .then(
      filters => {
          console.log("INTO The all filters get..");
          console.log(filters);
          
          dispatch({
              type: 'MARKET_ELE',
              filters
          })
      },
      error => {
          console.log("Into the Error...");
          console.log(error);
      }
  )
  .catch()
}


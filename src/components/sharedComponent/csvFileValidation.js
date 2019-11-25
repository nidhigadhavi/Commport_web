const CsvValidationConfig = {    
    cols: ["Name of the company"
        , "Employee Code"
        , "Employee Full name"
        , "Employee First Name"
        , "Email ID", "Gender"
        , "Country"
        , "City"
        , "BU Level-1 (top organisation)"
        , "BU Level-2 (Division)"
        , "BU Level-3 (Area)"
        , "Function"
        , "Sub Function"
        , "Sub Sub Function"
        , "Designation/Title"
        , "Grade"
        , "Level"
        , "Education"
        , "Identified talent"
        , "Critical Position holder"
        , "Special Category-1"
        , "Date of Joining"
        , "Date of joining for salary review purpose"
        , "Start date for role (for bonus calculation only)"
        , "End date of the role (for bonus calculation only)"
        , "Bonus/ Incentive applicability"
        , "Recently Promoted (Yes/No)"
        , "Performance Achievement"
        , "Performance Rating for this year"
        , "Performance Rating for previous year"
        , "Performance Rating for 2nd last year"
        , "Performance Rating for 3rd last year"
        , "Performance Rating for 4th last year"
        , "Performance Rating for 5th last year"
        , "Effective date of Last Salary increase"
        , "Effective date of 2nd Salary increase"
        , "Effective date of 3rd last Salary increase"
        , "Effective date of 4th Last Salary increase"
        , "Effective date of 5th Last Salary increase"
        , "Base Salary after last increase"
        , "Base Salary after 2nd last increase"
        , "Base Salary after 3rd last increase"
        , "Base Salary after 4th last increase"
        , "Base Salary after 5th last increase"
        , "Total Salary after last increase"
        , "Total Salary after 2nd last increase"
        , "Total Salary after 3rd last increase"
        , "Total Salary after 4th last increase"
        , "Total Salary after 5th last increase"
        , "Target Salary after last increase"
        , "Target Salary after 2nd last increase"
        , "Target Salary after 3rd last increase"
        , "Target Salary after 4th last increase"
        , "Target Salary after 5th last increase"
        , "Currency"
        , "Base/Basic"
        , "Current target bonus"
        , "Target Incentive"
        , "Target LTI"
        , "Dearness Allowance"
        , "Housing"
        , "Children Education"
        , "Car EMI/Company Car"
        , "Transportation"
        , "Parking Allowance"
        , "Meal Allowance"
        , "Mobile Allowance"
        , "LTA"
        , "Medical Allowance"
        , "Books & Periodicals Allowances"
        , "Subsistence Allowance"
        , "Fitness Allowance"
        , "Entertainment Allowance"
        , "City Compensatory Allowance"
        , "Uniform Allowance"
        , "Miscellaneous Allowance"
        , "ESIC"
        , "Provident Fund"
        , "NPS"
        , "Social Security"
        , "Stipend Allowance"
        , "Statutory Bonus"
        , "Superannuation"
        , "Perquisite For Office Equipments"
        , "Allowance 28"
        , "Allowance 29"
        , "Allowance 30"
        , "Allowance 31"
        , "Allowance 32"
        , "Allowance 33"
        , "Allowance 34"
        , "Allowance 35"
        , "Allowance 36"
        , "Allowance 38"
        , "Allowance 37"
        , "Allowance 39"
        , "Allowance 40"
        , "Total compensation"
        , "Increment to be applied on"
        , "Market Data matching job code"
        , "Matched market job name"
        , "Matched job level"
        , "MBM Base-1"
        , "MBM Base-2"
        , "MBM Base-3"
        , "MBM Base-4"
        , "MBM Base-5"
        , "MBM Base-6"
        , "MBM Base-7"
        , "MBM Base-8"
        , "MBM Base-9"
        , "MBM Base-10"
        , "MBM Base-11"
        , "MBM Total Comp-1"
        , "MBM Total Comp-2"
        , "MBM Total Comp-3"
        , "MBM Total Comp-4"
        , "MBM Total Comp-5"
        , "MBM Total Comp-6"
        , "MBM Total Comp-7"
        , "MBM Total Comp-8"
        , "MBM Total Comp-9"
        , "MBM Total Comp-10"
        , "MBM Total Comp-11"
        , "MBM Total Target Comp-1"
        , "MBM Total Target Comp-2"
        , "MBM Total Target Comp-3"
        , "MBM Total Target Comp-4"
        , "MBM Total Target Comp-5"
        , "MBM Total Target Comp-6"
        , "MBM Total Target Comp-7"
        , "MBM Total Target Comp-8"
        , "MBM Total Target Comp-9"
        , "MBM Total Target Comp-10"
        , "MBM Total Target Comp-11"
        , "Approver-1"
        , "Approver-2"
        , "Approver-3"
        , "Approver-4"
        , "Manager Name"
        , "Authorised signatory"
        , "Authorised signatory's title"
        , "HR Authorised signatory for letter"
        , "HR Authorised signatory's title for letter"
        , "Teeth/Tail Ratio"
        , "Previous Talent Rating"
        , "Promoted in 2 yrs"
        , "Engagement level"
        , "Successor Identified"
        , "Readyness level"
        , "Urban/Rural classification"
        , "Employee Movement into Bonus Plan"
        , "Other Data-9"
        , "Other Data-10"
        , "Other Data-11"
        , "Other Data-12"
        , "Other Data-13"
        , "Other Data-14"
        , "Other Data-15"
        , "Other Data-16"
        , "Other Data-17"
        , "Other Data-18"
        , "Other Data-19"
        , "Other Data-20"
    ],
    header: [
        { "Name of the company": 'Integer' }
        , { "Employee Code": 'Integer' }
        , { "Employee Full name": 'String' }
        , { "Employee First Name": 'String' }
        , { "Email ID": 'String' }
        , { "Gender": 'String' }
        , { "Country": 'String' }
        , { "City": 'String' }
        , { "BU Level-1 (top organisation)": 'String' }
        , { "BU Level-2 (Division)": 'String' }
        , { "BU Level-3 (Area)": 'String' }
        , { "Function": 'String' }
        , { "Sub Function": 'String' }
        , { "Sub Sub Function": 'String' }
        , { "Designation/Title": 'String' }
        , { "Grade": 'String' }
        , { "Level": 'Integer' }
        , { "Education": 'String' }
        , { "Identified talent": 'String' }
        , { "Critical Position holder": 'String' }
        , { "Special Category-1": 'String' }
        , { "Date of Joining": 'String' }
        , { "Date of joining for salary review purpose": 'String' }
        , { "Start date for role (for bonus calculation only)": 'String' }
        , { "End date of the role (for bonus calculation only)": 'String' }
        , { "Bonus/ Incentive applicability": 'Integer' }
        , { "Recently Promoted (Yes/No)": 'String' }
        , { "Performance Achievement": 'String' }
        , { "Performance Rating for this year": 'Integer' }
        , { "Performance Rating for previous year": 'Integer' }
        , { "Performance Rating for 2nd last year": 'Integer' }
        , { "Performance Rating for 3rd last year": 'Integer' }
        , { "Performance Rating for 4th last year": 'Integer' }
        , { "Performance Rating for 5th last year": 'Integer' }
        , { "Effective date of Last Salary increase": 'Integer' }
        , { "Effective date of 2nd Salary increase": 'Integer' }
        , { "Effective date of 3rd last Salary increase": 'Integer' }
        , { "Effective date of 4th Last Salary increase": 'Integer' }
        , { "Effective date of 5th Last Salary increase": 'Integer' }
        , { "Base Salary after last increase": 'Integer' }
        , { "Base Salary after 2nd last increase": 'Integer' }
        , { "Base Salary after 3rd last increase": 'Integer' }
        , { "Base Salary after 4th last increase": 'Integer' }
        , { "Base Salary after 5th last increase": 'Integer' }
        , { "Total Salary after last increase": 'Integer' }
        , { "Total Salary after 2nd last increase": 'Integer' }
        , { "Total Salary after 3rd last increase": 'Integer' }
        , { "Total Salary after 4th last increase": 'Integer' }
        , { "Total Salary after 5th last increase": 'Integer' }
        , { "Target Salary after last increase": 'Integer' }
        , { "Target Salary after 2nd last increase": 'Integer' }
        , { "Target Salary after 3rd last increase": 'Integer' }
        , { "Target Salary after 4th last increase": 'Integer' }
        , { "Target Salary after 5th last increase": 'Integer' }
        , { "Currency": 'Integer' }
        , { "Base/Basic": 'Integer' }
        , { "Current target bonus": 'Integer' }
        , { "Target Incentive": 'Integer' }
        , { "Target LTI": 'Integer' }
        , { "Dearness Allowance": 'Integer' }
        , { "Housing": 'Integer' }
        , { "Children Education": 'Integer' }
        , { "Car EMI/Company Car": 'Integer' }
        , { "Transportation": 'Integer' }
        , { "Parking Allowance": 'Integer' }
        , { "Meal Allowance": 'Integer' }
        , { "Mobile Allowance": 'Integer' }
        , { "LTA": 'Integer' }
        , { "Medical Allowance": 'Integer' }
        , { "Books & Periodicals Allowances": 'Integer' }
        , { "Subsistence Allowance": 'Integer' }
        , { "Fitness Allowance": 'Integer' }
        , { "Entertainment Allowance": 'Integer' }
        , { "City Compensatory Allowance": 'Integer' }
        , { "Uniform Allowance": 'Integer' }
        , { "Miscellaneous Allowance": 'Integer' }
        , { "ESIC": 'Integer' }
        , { "Provident Fund": 'Integer' }
        , { "NPS": 'Integer' }
        , { "Social Security": 'String' }
        , { "Stipend Allowance": 'Integer' }
        , { "Statutory Bonus": 'Integer' }
        , { "Superannuation": 'Integer' }
        , { "Perquisite For Office Equipments": 'Integer' }
        , { "Allowance 28": 'Integer' }
        , { "Allowance 29": 'Integer' }
        , { "Allowance 30": 'Integer' }
        , { "Allowance 31": 'Integer' }
        , { "Allowance 32": 'Integer' }
        , { "Allowance 33": 'Integer' }
        , { "Allowance 34": 'Integer' }
        , { "Allowance 35": 'Integer' }
        , { "Allowance 36": 'Integer' }
        , { "Allowance 38": 'Integer' }
        , { "Allowance 37": 'Integer' }
        , { "Allowance 39": 'Integer' }
        , { "Allowance 40": 'Integer' }
        , { "Total compensation": 'Integer' }
        , { "Increment to be applied on": 'Integer' }
        , { "Market Data matching job code": 'String' }
        , { "Matched market job name": 'String' }
        , { "Matched job level": 'String' }
        , { "MBM Base-1": 'String' }
        , { "MBM Base-2": 'String' }
        , { "MBM Base-3": 'String' }
        , { "MBM Base-4": 'String' }
        , { "MBM Base-5": 'String' }
        , { "MBM Base-6": 'String' }
        , { "MBM Base-7": 'String' }
        , { "MBM Base-8": 'String' }
        , { "MBM Base-9": 'String' }
        , { "MBM Base-10": 'String' }
        , { "MBM Base-11": 'String' }
        , { "MBM Total Comp-1": 'String' }
        , { "MBM Total Comp-2": 'String' }
        , { "MBM Total Comp-3": 'String' }
        , { "MBM Total Comp-4": 'String' }
        , { "MBM Total Comp-5": 'String' }
        , { "MBM Total Comp-6": 'String' }
        , { "MBM Total Comp-7": 'String' }
        , { "MBM Total Comp-8": 'String' }
        , { "MBM Total Comp-9": 'String' }
        , { "MBM Total Comp-10": 'String' }
        , { "MBM Total Comp-11": 'String' }
        , { "MBM Total Target Comp-1": 'String' }
        , { "MBM Total Target Comp-2": 'String' }
        , { "MBM Total Target Comp-3": 'String' }
        , { "MBM Total Target Comp-4": 'String' }
        , { "MBM Total Target Comp-5": 'String' }
        , { "MBM Total Target Comp-6": 'String' }
        , { "MBM Total Target Comp-7": 'String' }
        , { "MBM Total Target Comp-8": 'String' }
        , { "MBM Total Target Comp-9": 'String' }
        , { "MBM Total Target Comp-10": 'String' }
        , { "MBM Total Target Comp-11": 'String' }
        , { "Approver-1": 'String' }
        , { "Approver-2": 'String' }
        , { "Approver-3": 'String' }
        , { "Approver-4": 'String' }
        , { "Manager Name": 'String' }
        , { "Authorised signatory": 'String' }
        , { "Authorised signatory's title": 'String' }
        , { "HR Authorised signatory for letter": 'String' }
        , { "HR Authorised signatory's title for letter": 'String' }
        , { "Teeth/Tail Ratio": 'String' }
        , { "Previous Talent Rating": 'String' }
        , { "Promoted in 2 yrs": 'String' }
        , { "Engagement level": 'String' }
        , { "Successor Identified": 'String' }
        , { "Readyness level": 'String' }
        , { "Urban/Rural classification": 'String' }
        , { "Employee Movement into Bonus Plan": 'String' }
        , { "Other Data-9": 'String' }
        , { "Other Data-10": 'String' }
        , { "Other Data-11": 'String' }
        , { "Other Data-12": 'String' }
        , { "Other Data-13": 'String' }
        , { "Other Data-14": 'String' }
        , { "Other Data-15": 'String' }
        , { "Other Data-16": 'String' }
        , { "Other Data-17": 'String' }
        , { "Other Data-18": 'String' }
        , { "Other Data-19": 'String' }
        , { "Other Data-20": 'String' }
    ]
}

export default CsvValidationConfig;
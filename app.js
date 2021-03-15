const { createStore, combineReducers } = require('redux');


console.clear();

// Action creators (people dropping off form)
const createPolicy = (name, amount) => {
  return { //Action (a form in our analogy)
    type: 'CREATE_POLICY',
    payload: {
      name: name,
      amount: amount
    }
  };
};

const createClaim = (name, claimAmount) => {
  return {
    type: 'CREATE_CLAIM',
    payload: {
      name: name,
      claimAmount: claimAmount
    }
  };
};

const deletePolicy = (name) => {
  return {
    type: 'DELETE_POLICY',
    payload: {
      name: name
    }
  };
};

// Reducer (Department - Claims History)
const claimsHistory = (oldListOfClaims = [], action) => {
  if(action.type === 'CREATE_CLAIM') {
    return [...oldListOfClaims, action.payload];
  }
  return oldListOfClaims;
};

// Reducer (Department - Accounting)
const accounting = (bagOfMoney = 100, action) => {
  if(action.type === 'CREATE_CLAIM') {
    return bagOfMoney - action.payload.claimAmount;
  } else if(action.type === 'CREATE_POLICY') {
    return bagOfMoney + action.payload.amount;
  }
  return bagOfMoney;
};

// Reducer (Department - Policies)
const policies = (listOfPolicies = [], action) => {
  if(action.type === 'CREATE_POLICY') {
    return [...listOfPolicies, action.payload.name];
  } else if (action.type === 'DELETE_POLICY') {
    return listOfPolicies.filter(name => name !== action.payload.name);
  }
  return listOfPolicies;
};


const ourDepartments = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies
});

const store = createStore(ourDepartments);

const action = createPolicy('Fred', 40)

store.dispatch(action);
console.log(store.getState());


store.dispatch(createPolicy('Bob', 10));
store.dispatch(createPolicy('Kira', 100));
store.dispatch(createPolicy('Kim', 50));

console.log(store.getState());


store.dispatch(createClaim('Bob', 50));
console.log(store.getState());

store.dispatch(deletePolicy('Kim'));
console.log(store.getState());



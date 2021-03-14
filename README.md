# redux-learn

## Goals
-[ ] Understand what Redux is.
-[ ] How it relates to React

### Redux is:- 
1. A state management library.
2. It makes creating complex applications (ie with state) easier.
3. Not required in order to create a React app.
4. Not explicitly designed to work with React, can  be used with other libraries and languages.

### We have React why do we need Redux?
The React library is all about rendering content on the screen and handling user interaction.
Its primary role is not around maintaining, updating, deleting or otherwise handling data, thus we can make redux in charge of this.  


## The Redux Cycle

Basically what happens internally inside of Redux.



![redux-cycle-png](images/png/Redux-Cycle.png)


## Analogy to explain Redux:-

We own an insurance company, in which our customers have:-
- policy (customer purchases/holds a `policy`)
- claim ( a customer can make a `claim`)

![Our-Insurance-Co-png](images/png/Our-Insurance-Co.png)

Our insurance company has three departments, 
- Claims History
  - Stores/updates list of claimants
- Policies
  -  Stores/updates the list of policy holders (by name)
- Accounting
  - Controls the bad of cash, ie money in (new policies), money  out (claims made)

The Departments operate in isolation, in that they do not communicate with each other, each department receives its information from the receiver (front office).

The receiver (front office), is in fact a single person called lazy Brian, for whom inertia is his favourite pastime. When Brian receives a form he copies it and sends it out to all three departments.


![Our-Insurance-Co-Management-png](images/png/Our-Insurance-Co-Management.png)


After watching Wolf of Wall Street, the management decide the only way to make big bucks is to issue an IPO, in order to progress matters they want hourly reports from departments.

![Our-Ins-Co-central-repo-png](images/png/Our-Ins-Co-central-repo.png)

blah blah


![Forms-png](images/png/Forms.png)

So what would this look like in our JS code:

```js
const createPolicy = (name, amount) => { //Action creator (customer in our analogy)
  return { //Action (a form in our analogy)
    type: CREATE_POLICY,
    payload: {
      name: name,
      amount: amount
    }
  };
};

const createClaim = (name, claimAmount) => {
  return {
    type:CREATE_CLAIM,
    payload: {
      name: name,
      claimAmount: claimAmount
    }
  };
};

const deletePolicy = (name) => {
  return {
    type:DELETE_POLICY,
    payload: {
      name: name
    }
  };
};
```


Blah blah 

What the different departments need to do:-



![Accounting-department-png](images/png/Accounting.png)

How would this look in our code:-  

```js
// Reducer (Department - Accounting)
const accounting = (bagOfMoney = 100, action) => {
  if(action.type === 'CREATE_CLAIM') {
    return bagOfMoney - action.payload.claimAmount;
  } else if(action.type === 'CREATE_POLICY') {
    return bagOfMoney + action.payload.amount;
  }
  return bagOfMoney;
};
```


![Claims-History-department-png](images/png/Claims-History.png)

How would this look in our code:-  

```js

// Reducer (Department - Claims History)
const claimsHistory = (oldListOfClaims = [], action) => {
  if(action.type === 'CREATE_CLAIM') {
    return [...oldListOfClaims, action.payload];
  }
  return oldListOfClaims;
};
```

![Policies-department-png](images/png/Policies.png)

How would this look in our code:-  

```js

// Reducer (Department - Policies)
const policies = (listOfPolicies = [], action) => {
  if(action.type === 'CREATE_POLICY') {
    return [...listOfPolicies, action.payload.name];
  } else if (action.type === 'DELETE_POLICY') {
    return listOfPolicies.filter(name => name !== action.payload.name);
  }
  return listOfPolicies;
};
```









---

### So far:- ###


We have done:- 

![redux-cycle-Ins-Co-Updated.png](images/png/Redux-Cycle-Ins-Co-Updated.png)


BLAH BLAH BLAH

---




Summary

![redux-cycle-Ins-Co.png](images/png/Redux-Cycle-Ins-Co.png)


1. Action Creator - Person dropping off the form ***- (WE CREATE THIS)***
    - A function that returns a plain JS object, ie it creates the action below thats all.
2. Action - The form ***- (WE CREATE THIS)***
    - The plain JS object above is referred to as an action.
    - It has `type` & `payload` properties.
      - `type property` describes some change that want to make inside of our data.
      - `payload property` describes what we want to change to.
    - so it basically describes what data we want to change & how we want it to change. 
3. Dispatch - Form receiver **- PART OF REDUX**
   - The dispatch function, takes in the action object and makes copies of it and passes those copies off to different places.
4. Reducers - Departments ***- (WE CREATE THESE)***
   - A reducer is a function that is responsible for taking in an action and some existing amount of data.
     - It process that action by type (if applicable)
     - Makes changes to the applicable data
     - Returns that 'updated' data 
5. State - Compiled department data **- PART OF REDUX**
   - It's an object.
   - It is the central repository, that holds all the data produced/updated by our reducers.

flflflflf

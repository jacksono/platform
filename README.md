# Platform
A simple membership platform.

In this first release version, you can:
* Create a plan.
```
A plan can be recurrent or time limited. 
If time limited, the plan  must have start date and an end date.
All plans must have a name. 
```
* Add members to a plan.
```
A member can be added to a plan.
The member must have a first name, last name and date of birth.
```
* List members by plan.
```
You can list members by the plan they belong to.
```


### Endpoints:
#### Create a new member:
```
URL - /api/v1/members
Method - POST
Request body - {  lastName: <last name>,
                  firstName: <first name>,
                  dob: <date of birth>
                }
Status Code - 201
Response body - {
                  "data": {
                      "id": 3,
                      "firstName": "Blake",
                      "lastName": "Jeffreys",
                      "dob": "10/12/12",
                      "updatedAt": "2019-01-29T17:28:56.827Z",
                      "createdAt": "2019-01-29T17:28:56.827Z",
                      "planId": null
                  }
```

#### Create a new plan.
```
URL - /api/v1/plans
Method - [POST]
Request body - {  planName: <plan name>,
                  type: <["recurrent" | "time-limited"],
                  startDate: <start date>,
                  endDate: < end date >
                }
Status Code - 201
Response body - {
                  "data": {
                      "id": 3,
                      "planName": "Gold",
                      "type": "recurrent",
                      "updatedAt": "2019-01-29T17:34:31.287Z",
                      "createdAt": "2019-01-29T17:34:31.287Z",
                      "startDate": null,
                      "endDate": null
                  }
                }
```

#### Add a member to a plan.
```
URL - /api/v1/plans/planId/members/memberId
Method - PATCH
Request body - N/A
Status Code - 200
Response body - {
                  "data": "Updated Successfully"
                }
```

#### List members belonging to a plan.
```
URL - /api/v1/plans/id/members
Method - GET
Request body - N/A
Status Code - 200
Response body - {
                  "data": [
                            {
                                "id": 1,
                                "firstName": "Mark",
                                "lastName": "Namara",
                                "dob": "12/12/2009",
                                "createdAt": "2019-01-29T15:03:22.387Z",
                                "updatedAt": "2019-01-29T17:36:59.971Z",
                                "planId": 1
                            },
                            {
                                "id": 1,
                                "firstName": "James",
                                "lastName": "Bale",
                                "dob": "12/12/2009",
                                "createdAt": "2019-01-29T15:03:22.387Z",
                                "updatedAt": "2019-01-29T17:36:59.971Z",
                                "planId": 1
                            }
                          ]
                        }
```

### Getting Started
To start the API server on your machine (mac):
* Clone this repo.
* Run `npm install` in the directory you cloned the repo.
* Create a `.env` file in the root of the directory and add in it details as shown in the `.env-sample`
* Run `npm start` to start the server and access the API on `localhost:8000/api/v1/<endpoint>`
* Run `npm test` to run the tests.

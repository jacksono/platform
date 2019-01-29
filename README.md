# Platform
A simple membership platform.

In this first release version, you can:
* Create a plan.
* Add members to a plan.
* List members by plan.


Endpoints:
/api/v1/members [POST] - to create a new member

/api/v1/plans [POST] - to create a new plan

/api/v1/plans/planId/members/memberId [PATCH] - to add a member to a plan

/api/v1/plans/id/members [GET] - to list members belonging to a plan

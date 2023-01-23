# Evalu8

Evalu8 is a performance evaluation software tool with a user-friendly interface which is highly responsive and intuitive, and provides an efficient method for managers in a Computer Science university classroom setting to evaluate their team members with clear and standardized evaluation criteria.  Furthermore, it is a good tool for managers to use to collect data on individual team members to provide accurate feedback during team member performance evaluations.

The metrics used for evaluation in Evalu8 are based on the  metrics currently used in the software engineering industry and have been modified as necessary to conform to the requirements and expectation of Computer Science courses at University of Massachusetts, Amherst. The main categories of the the evaluation software tool can be categorized broadly into engagement, contribution, and progress. The specific metrics used for Evalu8’s performance evaluation system in order to conform to Computer Science course requirements are team member attendance, total commits contributed to project codebase, total lines of code contributed to project codebase, project tasks completed, project tasks assigned and overall team member progress.  Additionally team member progress is measured by team member progress satisfaction, team member progress pacing, and team member progress environmental impact. 

The application Evalu8 has been evaluated using usability testing guided by Nielsen’s definition of usability.  This was done by creating a questionnaire to measure qualitative and quantitative feedback on each parameter in Nielsen’s definition including learnability, efficiency, memorability, number of errors committed, number of assists and satisfaction.  

Evalu8 has been programmed with a ReactJS frontend, a NodeJS backend and a relational PostgreSQL database.


## User Interface

| UI View                   | Purpose |
|---------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Create	an Account        | This page enables a user to create an account. |
| Login                     | This	page	enables	a	manager to	login	to	the	software	tool	web	platform. |
| Team	Members Display     | This page	provides	a	manager	with an	overview	of	the	members	of	their	teams in	the	form	of	team	member	cards	with	a	team	member’s	name,	email	and	GitHub	username.		                                                            |
| Engagement	Profile       | This	page	provides	a	manager	with	an overview	of	their	team	member’s engagement in	terms	of	attendance,	as	well	as completing	of	peer	and	manager	evaluations	for COMPSCI	320.                                           |
| Progress Profile          | This	page	provides	a	manager	with	an overview	of	their	team	member’s growth	in	terms	of	pacing,	satisfaction	and environmental	impact toward achieving	goals	set in	COMPSCI	320.                                           |
| Contribution	Profile     | This	page	provides	a	manager	with	an overview	of	their	team	member’s contribution	to	the	semester	long	project	in COMPSCI	320,	through providing information	on	total	lines	of	code contributed and	total	commits	contributed	to	the	project	repository.		It	also	provides details on	tasks	assigned	and	completed	by team	members.   |

## Backend Endpoints

Here is a consolidated list of the planned RESTful APIs: 

| Route               |  Description                                                                                                 |
|---------------------|--------------------------------------------------------------------------------------------------------------|
| /manager/createAccount         |  adds	a	new	manager	to	manager	table	in	the	database                                                            |
| /manager/info           |  gets	a	manager’s	profile	details	                                                              |
| /manager/delete           |  deletes	a	manager	from	the	manager’s	table	in	the	database         |
| /manager/addMember             |  adds	team	members	to	managers	team	member	array                                   |
| /manager/login      |  performs	authentication,	if	not	registered	redirects	to	login	page                                                               |
| /teammember/info      |  gets	a	team	member’s	profile	details                                                         |
| /teammember/edit           |  edits	a	team	member’s	profile	details                             |
| /engagement/findbyemail    |  gets	a	team	member’s	engagement	statistics	based	on	a	team	member’s	email                              |
| /tasks/findbyemail           |  gets	a	team	member’s	task	statistics based	on	a	team	member’s	email                                                |
| /goals/findbyemail    |  gets	a	team	member’s	goal-setting	statistics	based	on	a	team	member’s	email                              |

## Postgres Database

Evalu8 uses a PostgreSQL database.

### Managers Table
| Column            | Data Type | Description                       |
|-------------------|-----------|-----------------------------------|
| email             | text      | The email of the manager             |
| first name        | text      | The first name of the manager        |
| last name         | text      | The last name of the manager         |
| password          | text      | The password of the manager          |
| id                | int4      | The generated unique id of the manager           |
| team members                | text[]      | An array of the team members of a manager           |
| repository	name                | text      | the	repository	name	for	the	COMPSCI 320	semester	long	project           |
| repository	owner                | text      | the	repository	owner	name	for	the	COMPSCI 320	semester	long	project           |
| repository	token                | text      | the	repository private token for	the	COMPSCI 320	semester	long	project           |

### Team Member Table
| Column            | Data Type | Description                       |
|-------------------|-----------|-----------------------------------|
| email             | text      | The email of the team member             |
| first name        | text      | The first name of the team member        |
| last name         | text      | The last name of the team member         |

### Attendance on Date Table
| Column            | Data Type | Description                       |
|-------------------|-----------|-----------------------------------|
| date             | text      | The record of the date attendance is taken             |
| status        | text      | The attendance status of the team member        |
| team member info         | text      | The identity of the team member         |





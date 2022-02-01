# Evalu8

Evalu8 is a web application meant to be used by students who take on a managerial role in a classroom setting.

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



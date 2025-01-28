/*

This is example is from SAASWithServiceNow channel.

This script is a part of testing for the Quarantine email reminders for the requesters.
This section is about collecting the records of the requests raised and approved.
1) Find matching requests.
2) Check that requests that has been completed 337 days ago.
3) Check the requestor is still active.
3) Trigger email to remind that request that the Quarantine exception expires in 4 weeks.
4) The email includes details from the request - date, the email address that will be affected, and the business justification given. A link to the Quarantine review form

*/

```javascript
var gr = new GlideRecord('incident');  // Create the object for the query

gr.addActiveQuery();  // Create the query object
gr.query('request'); // Get the record object that we are querying. Request objects in this case.
while(gr.next())   // Walk through the list of records 
  {
	gs.log("The incident number is " + gr.number); // print thhe record number (Simple example)
  }
  gr.setNoCount;    // Loop to the next record in the list
```

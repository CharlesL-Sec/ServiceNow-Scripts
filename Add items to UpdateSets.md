
# Add items to Update Sets




```javascript

// SAVE RECORDS TO UPDATE SET:
var gr = new GlideRecord('sysevent_email_action') // Add the table name from URL
gr.addEncodedQuery('sys_package=d591deb12806201057b7a6460e6132c3^nameENDSWITHRW'); // Add the query to identify the records to add to the set, I take from right clicking the filters and copying filter.
gr.query();
gs.log(gr.getRowCount()); // I normally leave the below out first to identify the number of records is correct. If doing this on a large table and you get it wrong ity can take ages, and ages to delete as well....
while (gr.next()) {
  var um = new GlideUpdateManager2();
  um.saveRecord(gr);
}

var gr = new GlideRecord('sysevent_email_action' // Add the table name from URL
gr.addEncodedQuery('name=SI EJ proposed as MSI'); // Add the query to identify the records to add to the set, I take from right clicking the filters and copying filter.
gr.query();
gs.log(gr.getRowCount()); // I normally leave the below out first to identify the number of records is correct. If doing this on a large table and you get it wrong ity can take ages, and ages to delete as well....
while (gr.next()) {
  var um = new GlideUpdateManager2();
  um.saveRecord(gr);
}

```
### User input
- Add table name
- Add the search query from the script
- Run the script in instance instance/System definition - Scripts - Backroud


-- end


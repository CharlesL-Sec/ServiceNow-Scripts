
# Add items to Update Sets




```javascript

// SAVE RECORDS TO UPDATE SET:
var gr = new GlideRecord('sn_msi_report_template' // Add the table name from URL
gr.addEncodedQuery('name=CL - MSIM EJ  - Notifications and Reports'); // Add the query to identify the records to add to the set, I take from right clicking the filters and copying filter.
gr.query();
gs.log(gr.getRowCount()); // I normally leave the below out first to identify the number of records is correct. If doing this on a large table and you get it wrong ity can take ages, and ages to delete as well....
while (gr.next()) {
  var um = new GlideUpdateManager2();
  um.saveRecord(gr);
}

// completed update set notification and report templates  MSIM scope


// Update Notification records


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


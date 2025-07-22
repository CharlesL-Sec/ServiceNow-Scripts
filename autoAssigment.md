# ServiceNow SIR Assignnment Script



```json
// Based on script from - https://www.servicenow.com/community/developer-forum/assign-a-incident-automatically-to-a-user-in-group/m-p/1529430
 var groupName = 'SOC Incident Auto Assignment';
// Get a list of members for this group
// Corrected incident table to sn_si_incident.
function getAssignee() {

var members = [];
var gm = new GlideRecord('sys_user_grmember');
gm.addQuery('user.active', true);
gm.addQuery('group.name', groupName);
gm.query();a
 while (gm.next()) {
  members.push(String(gm.user));
}
// Get a list of their open ticket counts
var counts = [], agg, count;
for (var i = 0; i < members.length; i++) {
  count = 0;
  agg = new GlideAggregate('sn_si_incident');
  agg.addActiveQuery();
  agg.addQuery('assignment_group.name', groupName);
  agg.addQuery('assigned_to', members[i]);
  agg.addAggregate('COUNT');
  agg.query();
  if (agg.next())
    count = agg.getAggregate('COUNT');
    counts.push(count);
   }

   // find the minimum count and store its index
   // we cannot use .sort().shift() or we won't know where to look in the members array

var min = counts[0];
var index = 0;
for (var j = 1; j < counts.length; j++) {
  if (counts[j] < min) {
   min = parseInt(counts[j]);
   index = parseInt(j);
   }
}


// get the member with the lowest count
var userID = members[index];
// Log their name to verify
var user = new GlideRecord('sys_user');
if (user.get(userID)) {
  // gs.log('Name: ' + user.name);
  return ('Name: ' + user.name);
  }

}

gs.info(getAssignee());
```

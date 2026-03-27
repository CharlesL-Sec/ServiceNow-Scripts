
# Trigger notification event for testing.


```javascript
var gr = new GlideRecord('sn_si_incident');
gr.get('MSI0001024');
gs.eventQueue('SI EJ Next update reminder', gr, gs.getUserID(), gs.getUserName());

```

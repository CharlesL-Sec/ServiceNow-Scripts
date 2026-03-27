
# Trigger notification event for testing.


```javascript
var gr = new GlideRecord('incident');
gr.get('MSI0001024');
gs.eventQueue('SI EJ Next update reminder', gr, gs.getUserID(), gs.getUserName());

```


# Trigger notification event for testing.


```javascript
var gr = new GlideRecord('incident');
gr.get('<sys_id_of_record>');
gs.eventQueue('your.event.name', gr, gs.getUserID(), gs.getUserName());

```

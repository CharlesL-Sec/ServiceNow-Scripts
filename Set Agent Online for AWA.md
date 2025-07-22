# Purpose: Sets an Agent status online when the agent is logged in.

### Problem: An Agent is only assignemt task from Advanced Work Assignment once they manually set their presence in the Agent Workspace.

### Solution: This Action Action uses the login action to set each agents presence to "online@.

### Source Credit: https://www.servicenow.com/community/servicenow-ai-platform-forum/how-to-set-agent-availability-to-quot-available-quot-every-time/td-p/1213382

```javascript
var gr = new GlideRecord("awa_agent_presence");
gr.addQuery("agent", event.user_id.toString());
gr.query();

if (gr.next()) {
	gr.setDisplayValue("current_presence_state", "Available");
	gr.update();
}

```

### test that agent presences are set in the presence table 
- awa_agent_presence_history

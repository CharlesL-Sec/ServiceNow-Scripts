# Change email ingestino subject line

### From ServiceNow community post
- https://www.servicenow.com/community/developer-forum/email-client-script-dynamically-changing-subject-line/m-p/2855879

```javascript

var now = new GlideDateTime();
var reminderDate = new GlideDateTime();
reminderDate.addWeeks(1);
// Check if this is the 1 week reminder
if (now.equals(reminderDate)) {
  // Set the email subject and body for the 1 week reminder
  email.setSubject("1 Week Reminder: Your Task is Due Soon");
  email.setBody("Hello,\n\nThis is a reminder that your task is due in 1 week. Please complete it as soon as possible.\n\nThank you.");
}
// Check if this is the 2 week reminder
else if (now.equals(reminderDate.addWeeks(1))) {
  // Set the email subject and body for the 2 week reminder
  email.setSubject("2 Week Reminder: Your Task is Due Soon");
  email.setBody("Hello,\n\nThis is a reminder that your task is due in 2 weeks. Please complete it as soon as possible.\n\nThank you.");
}
// Check if this is the final reminder
else if (now.equals(reminderDate.addWeeks(1))) {
  // Set the email subject and body for the final reminder
  email.setSubject("Final Reminder: Your Task is Overdue");
  email.setBody("Hello,\n\nThis is a final reminder that your task is overdue. Please complete it as soon as possible.\n\nThank you.");
}
// If none of the conditions are met, use the default email subject and body
else {
  email.setSubject(gs.getMessage("Task Reminder"));
  email.setBody(gs.getMessage("This is a reminder that you have a task that is due soon."));
}

// Send the email notification
email.send();

```

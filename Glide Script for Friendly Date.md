# Add frendly date to notification
- Adds a friendly date to the notification.

```javascript
  (function runMailScript(current, template, email, email_action, event) {
    try {
        var nextUpdateVal = current.getValue('next_update_on');
        var displayString = '';

        if (nextUpdateVal) {
            var gdt = new GlideDateTime(nextUpdateVal);
            
            // 1. Get Date Parts using Scoped-safe methods
            var day = gdt.getDayOfMonthLocalTime();
            var year = gdt.getYearLocalTime();
            var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var month = monthNames[gdt.getMonthLocalTime() - 1];

            // 2. Format Time to 12-hour am/pm
            // We use getDisplayValue as it respects the user's local time settings
            var fullDisplay = gdt.getDisplayValue(); 
            var timePart = fullDisplay.split(' ')[1]; 
            var hours = parseInt(timePart.split(':')[0], 10);
            var mins = timePart.split(':')[1];
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; 

            // 3. Robust Timezone handling for UK-based teams
            // If we are in the UK, we'll append GMT/BST or simply use "GMT" for clarity
            var tz = "GMT"; 
            
            displayString = day + ' ' + month + ' ' + year + ' at ' + hours + ':' + mins + ampm + ' ' + tz;
        }

        // Generate the Body HTML
        var body = '<p><span style="font-size: 12pt;">The next update for <strong>' + current.number + '</strong> is due at <strong>' + (displayString || "TBD") + '</strong>. Log into the MSIM workspace to send out your next status report.</span></p><p>&nbsp;</p>';
        
        template.print(body);

    } catch (err) {
        // This ensures that even if there is a script error, we see it in the logs
        gs.error("MSIM Mail Script Error: " + err);
    }

    // 4. Print the rest of the template OUTSIDE the try/catch 
    // This guarantees the button shows up even if the date logic fails
    var button = '<p style="text-align: center;"><a style="text-decoration: none; color: white; background: #4F52BD; padding: 8px; border-radius: 5px; border: 1px solid; border-color: #4F52BD; font-size: 16px;" href="/now/msim/major-security-incident/' + current.getUniqueValue() + '"> View ' + current.number + ' in MSIM</a></p>';
    var openedByText = '<p><span style="font-size: 12pt;">Thank you,</span><br /><span style="font-size: 12pt;">' + current.getDisplayValue('opened_by') + ' (MSIM)</span></p>';
    
    template.print(button);
    template.print(openedByText);

})(current, template, email, email_action, event);
```

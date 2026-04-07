
## HTML for ServiceNow

#### Center text in a DIV with image background

```html

<p><img src="/sys_attachment.do?sys_id=d05309ee470443d4b45fde7b716d43b7" alt="" data-library="false"></p>

```
- Note how the image is used by using =
    'sys_attachment.do?sys_id=d05309ee470443d4b45fde7b716d43b7'



 ```html

<div style="width: 600px; max-width: 600px; margin: 0 auto;">
<div style="position: relative; width: 600px; height: 200px; overflow: hidden; font-family: Arial,sans-serif;"><img src="sys_attachment.do?sys_id=d05309ee470443d4b45fde7b716d43b7">
<table style="position: absolute; top: 0; left: 0; width: 600px; height: 200px;" role="presentation" border="0" width="600" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="padding: 0 24px; text-align: center; vertical-align: middle;" align="center" valign="middle">
<div style="font-size: 28px; line-height: 32px; font-weight: bold; color: #ffffff; text-shadow: 1px 1px 1px #000000;">Header Text Here</div>
<div style="font-size: 18px; line-height: 24px; font-weight: normal; color: #ffffff; text-shadow: 1px 1px 1px #000000;">Subtitle Goes Here</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>



```

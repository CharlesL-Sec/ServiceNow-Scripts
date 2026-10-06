/* Borrowed from  AnveshKumar M 
/* [splunk_ej_user](https://www.servicenow.com/community/developer-articles/easily-clone-one-user-s-groups-and-roles-to-another-user-in/ta-p/2729316)



// Created Script include
```javascript
var CloneUserProfileUtils = Class.create();
CloneUserProfileUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    cloneRolesGroups: function() {
        var usr = this.getParameter("sysparm_usr");
        var usr_ref = this.getParameter("sysparm_usr_ref");
        var override_existing = this.getParameter("sysparm_override_existing") + "";

        if (override_existing === 'true' && !gs.nil(usr)) {
            var clr_roles = this.clearRoles(usr);
            if (!clr_roles)
                return "false";
            var clr_grps = this.clearGroups(usr);
            if (!clr_grps)
                return "false";
        }

        if (!gs.nil(usr) && !gs.nil(usr_ref)) {
            var cpy_grps = this.copyGroups(usr, usr_ref);
            if (!cpy_grps)
                return "false";
			var cpy_roles = this.copyRoles(usr, usr_ref);
            if (!cpy_roles)
                return "false";
        }

        return "true";
    },

    clearRoles: function(usr) {
        try {
            var roleGr = new GlideRecord("sys_user_has_role");
            roleGr.addQuery("user", usr);
            roleGr.addQuery("inherited", false);
            roleGr.query();
            roleGr.deleteMultiple();
        } catch (ex) {
			gs.info("Role remove Error: " + ex);
            return false;
        }
        return true;

    },

    clearGroups: function(usr) {
        try {
            var grpGr = new GlideRecord("sys_user_grmember");
            grpGr.addQuery("user", usr);
            grpGr.query();
            gs.info("Grp RC: " + grpGr.getRowCount());
            grpGr.deleteMultiple();
        } catch (ex) {
			gs.info("Group remove Error: " + ex);
            return false;
        }
        return true;

    },

    copyRoles: function(usr, usr_ref) {
        try {
            var roleGr = new GlideRecord("sys_user_has_role");
            roleGr.addQuery("user", usr_ref);
            roleGr.addQuery("inherited", false);
            roleGr.query();
            while (roleGr._next()) {
                var tgtRoleGr = new GlideRecord("sys_user_has_role");
                tgtRoleGr.addQuery("user", usr);
                tgtRoleGr.addQuery("role", roleGr.getValue("role"));
                tgtRoleGr.query();
				
                if (!tgtRoleGr.hasNext()) {
                    tgtRoleGr.initialize();
                    tgtRoleGr.setValue("user", usr);
                    tgtRoleGr.setValue("role", roleGr.getValue("role"));
                    tgtRoleGr.insert();
                }
            }
        } catch (ex) {
			gs.info("Role copy Error: " + ex);
            return false;
        }
        return true;
    },

    copyGroups: function(usr, usr_ref) {
        try {
            var grpGr = new GlideRecord("sys_user_grmember");
            grpGr.addQuery("user", usr_ref);
            grpGr.query();
            while (grpGr._next()) {
                var tgtGrpGr = new GlideRecord("sys_user_grmember");
                tgtGrpGr.addQuery("user", usr);
                tgtGrpGr.addQuery("group", grpGr.getValue("group"));
                tgtGrpGr.query();

                if (!tgtGrpGr.hasNext()) {
                    tgtGrpGr.initialize();
                    tgtGrpGr.setValue("user", usr);
                    tgtGrpGr.setValue("group", grpGr.getValue("group"));
                    tgtGrpGr.insert();
                }
            }
        } catch (ex) {
			gs.info("Group copy Error: " + ex);
            return false;
        }
        return true;
    },

    type: 'CloneUserProfileUtils'
});

```

## UI Page - For dialog box popup

```javascript
function continueOK() {
	var gdw = GlideDialogWindow.get();
	var user_tgt = gdw.getPreference('usr');
	var user_ref = gel('user_ref').value;
	var override_existing = gel('override_existing').value;

	var ga = new GlideAjax("CloneUserProfileUtils");
	ga.addParam("sysparm_name", "cloneRolesGroups");
	ga.addParam("sysparm_usr", user_tgt);
	ga.addParam("sysparm_usr_ref", user_ref);
	ga.addParam("sysparm_override_existing", override_existing);
	ga.getXMLAnswer(processResponse);

	function processResponse(answer){
		if(answer === 'true')
			g_form.addInfoMessage("Roles and Groups cloned successfully.");
		else
			g_form.addErrorMessage("Roles and Groups clone failed.");
			
		GlideDialogWindow.get().destroy();
	}
}
function continueCancel() {
	GlideDialogWindow.get().destroy();
}

```


### UI Page HTML


```html
<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">
   <g:evaluate var="jvar_usr" jelly="true">
      var usr = RP.getWindowProperties().get('usr');
	  usr;
   </g:evaluate>
   <g:evaluate var="jvar_usr_disp" jelly="true">
      var usr1 = RP.getWindowProperties().get('usr');
	  var usr_disp = "";
	  var usrGR = new GlideRecord("sys_user");
	  usrGR.addQuery("sys_id", usr1);
	  usrGR.query();
	  if (usrGR.next()) {
        usr_disp = usrGR.getDisplayValue();
     }
     usr_disp;
   </g:evaluate>
   <br/>
   
   <div class="alert alert-info">
      <strong>Note:</strong> You should elevate to security_admin to copy security_admin role.
   </div>

   <g:ui_form>
	  <br/>
      <table>
         <tr>
            <td style="width:25%">
               <g:form_label>
                  Target User: 
               </g:form_label>
            </td>
            <td style="width:60%">
               <b>${usr_disp}</b><br/>
            </td>
         </tr>				
         <tr>
            <td style="width:25%">
               <g:form_label>
                  Reference User: 
               </g:form_label>
            </td>
            <td style="width:60%">
               <g:ui_reference name="user_ref" id="user_ref" query="active=true" table="sys_user"  />
            </td>
         </tr>
         <tr>
            <td style="width:25%">
               <g:form_label>
                  Override Existing Roles &amp; Groups:
               </g:form_label>
            </td>
            <td style="width:60%">
               <g:ui_checkbox name="override_existing" id="override_existing" value="false"/>
            </td>
         </tr>
		 
      </table>
	  <div id="dialog_buttons" class="clearfix pull-right no_next">
	  	 <g:dialog_buttons_ok_cancel ok_id="submitData" ok="return continueOK()" ok_type="button" ok_text="${gs.getMessage('Clone')}" ok_style_class="btn btn-primary" cancel_type="button" cancel_id="cancelData" cancel_style_class="btn btn-default" cancel="return continueCancel()"/>
	  </div>
   </g:ui_form>
</j:jelly>
```


### UI Action to Clone Roles and Groups


```javescript
function cloneUser() {
	var dialogClass = GlideDialogWindow;
	var dialog = new dialogClass("clone_user_roles_groups");
	dialog.setTitle("Clone Roles & Groups");
	dialog.setPreference("usr",g_form.getUniqueValue());
	dialog.setWidth(800);
	dialog.render();	
}

```

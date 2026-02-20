
# ServiceNow Tetmplate Script for MSIM reporting templates


## With Gemini AI assistance.


Save as template script.

call using ${templates_cript: msimimages}   in Report section or subsection 


```javascript
(function runTemplateScript(target /*GlideRecord for target MSI*/) {
    try {
        var msiSysId = target.getUniqueValue();
        var htmlOutput = "";
        
        var gr = new GlideRecord('sys_attachment');
        gr.addQuery('table_sys_id', msiSysId);
        gr.addQuery('content_type', 'STARTSWITH', 'image/');
        gr.query();
        
        if (!gr.hasNext()) {
            return "<i>No image attachments found.</i>";
        }

        var sa = new GlideSysAttachment();

        while (gr.next()) {
            var fileName = gr.getValue('file_name');
            var contentType = gr.getValue('content_type');
            var sysId = gr.getUniqueValue();
            
            // Generate a clean relative URL to completely prevent system "fanging" 
            var cleanRelativeUrl = "/sys_attachment.do?sys_id=" + sysId;
            var imageSrc = cleanRelativeUrl;

            // Attempt to encode the attachment as Base64 for optimal report rendering
            try {
                var stream = sa.getContentStream(sysId);
                if (stream) {
                    var encodedStream = GlideStringUtil.base64Encode(stream);
                    if (encodedStream) {
                        imageSrc = "data:" + contentType + ";base64," + encodedStream;
                    }
                }
            } catch (encodeError) {
                // Silently fallback to the clean relative URL if scoped API blocks stream encoding
            }

            // Construct HTML utilizing strict inline CSS
            htmlOutput += '<div style="margin-bottom: 25px; border-bottom: 1px solid #eeeeee; padding-bottom: 10px; font-family: sans-serif; text-align: left;">';
            htmlOutput += '<div style="font-weight: bold; color: #333333; margin-bottom: 8px;">' + fileName + '</div>';
            htmlOutput += '<img src="' + imageSrc + '" alt="' + fileName + '" style="max-width: 600px; width: 100%; height: auto; display: block; border: 1px solid #cccccc; border-radius: 4px;" />';
            htmlOutput += '</div>';
        }
        
        return htmlOutput;
        
    } catch (e) {
        return "Error displaying images: " + e.message;
    }
})(target);

```

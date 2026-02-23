
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

       // ... existing while loop start ...
        while (gr.next()) {
            var rawFileName = gr.getValue('file_name');
            var contentType = gr.getValue('content_type');
            var sysId = gr.getUniqueValue();
            
            // 1. Remove the file extension (everything after the last dot)
            var nameWithoutExt = rawFileName.substring(0, rawFileName.lastIndexOf('.')) || rawFileName;
            
            // 2. Replace all underscores with spaces
            var nameWithSpaces = nameWithoutExt.replace(/_/g, ' ');
            
            // 3. Capitalize the first character
            var humanizedName = nameWithSpaces.charAt(0).toUpperCase() + nameWithSpaces.slice(1);
            
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
                // Silently fallback to the clean relative URL
            }

            // Construct HTML utilizing strict inline CSS
            htmlOutput += '<div style="margin-bottom: 25px; border-bottom: 1px solid #eeeeee; padding-bottom: 10px; font-family: sans-serif; text-align: left;">';
            
            // Inject the humanizedName instead of the raw fileName
            htmlOutput += '<div style="font-weight: bold; color: #333333; margin-bottom: 8px;">' + humanizedName + '</div>';
            
            // Keep the raw fileName in the alt attribute for accessibility/reference
            htmlOutput += '<img src="' + imageSrc + '" alt="' + rawFileName + '" style="max-width: 600px; width: 100%; height: auto; display: block; border: 1px solid #cccccc; border-radius: 4px;" />';
            htmlOutput += '</div>';
        }
// ... existing loop end ...
        
        return htmlOutput;
        
    } catch (e) {
        return "Error displaying images: " + e.message;
    }
})(target);

```

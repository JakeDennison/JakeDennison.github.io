function onLoad(executionContext) {
    var formContext = executionContext.getFormContext();
    var iframeControl = formContext.getControl("IFRAME_docgen");

    if (iframeControl) {
        var iframeSrc = "https://demo-safalo-emea.workflowcloud.com/embedform/iframe?id=71137b22-e496-46b9-99a8-2f55f0dc9733&tenancy=demo-safalo-emea.workflowcloud.com";
        iframeControl.setSrc(iframeSrc);
        
        // Additional IFrame properties can be set here (like height, width, etc.) as per your requirements.
    }
}

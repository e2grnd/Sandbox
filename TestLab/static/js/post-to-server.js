(function (GLOBAL, $) {

	function checkForAjaxSupport() {
		
		
	  return supportFileAPI() && supportUploadProgress() && supportFormData();
	  
	  // Check if the file is API supported
	  function supportFileAPI() {
	    var fileCheck = document.createElement('INPUT');
	    fileCheck.type = 'file';
	    return 'files' in fileCheck;
	  };
	  
	  // Check if progress events are supported
	  function supportUploadProgress() {
	    var xhr = new XMLHttpRequest();
	    return !! (xhr && ('upload' in xhr) && ('onprogress' in xhr.upload));
	  };
	  
	  // Check if FormData is supported?
	  function supportFormData() {
	    return !! window.FormData;
	  }
	}
	
	// Confirm Ajax support
	if (checkForAjaxSupport()) {
		
	  // Ajax uploads are supported
	  // Change the support message and enable the upload button
	  var notice = document.getElementById("support-notice");
	  var uploadBtn = document.getElementById('upload-button-id');
	  
	  notice.innerHTML = "Upload File to Server";
	  uploadBtn.removeAttribute('disabled');
	  
	  // Initialize the file upload
	  initFileAjaxUpload();
	  
	}
	
	function initFileAjaxUpload() {
		
	  var uploadBtn = document.getElementById('upload-button-id');
	  
	  uploadBtn.onclick = function (evt) {
		  
	    var formData = new FormData();
	    
	    
	    var destinationURI = location.protocol + "//" + hostIP + 
	               ":" + location.port + "/data/uploadFile.php";
	    
	    // FAppend the file to FormData
	    var fileInput = document.getElementById('file-id');
	    var file = fileInput.files[0];
	    formData.append('my-file', file);
	    
	    $.ajax({
	        url: destinationURI,
	        type: "POST",
	        data: formData,
	        cache: false,
	        processData: false,
	        contentType: false,
	        success: function(response) {
	            alert("success");
	        },
	        error: function(response) {
	        	alert("failed");
	        }
	     });
	    
	    // Send XMLHttpRequest 
	    //sendXHRequest(formData, destinationURI);
	  }
	}
	
	/*
	// Once the FormData instance is ready and we know
	// where to send the data
	function sendXHRequest(formData, uri) {
		
	  // Get an new XMLHttpRequest instance
	  var xhr = new XMLHttpRequest();
	  
	  // Set up events
	  xhr.upload.addEventListener('loadstart', onloadstartHandler, false);
	  xhr.upload.addEventListener('progress', onprogressHandler, false);
	  xhr.upload.addEventListener('load', onloadHandler, false);
	  xhr.addEventListener('readystatechange', onreadystatechangeHandler, false);
	  
	  // Set up request
	  xhr.open('POST', uri, true);
	  
	  // Send Request
	  xhr.send(formData);
	}
	
	// Handle the start of the transmission
	function onloadstartHandler(evt) {
	  var div = document.getElementById('upload-status');
	  div.innerHTML = 'Upload started.';
	}
	
	// Handle the end of the transmission
	function onloadHandler(evt) {
	  var div = document.getElementById('upload-status');
	  div.innerHTML += '<' + 'br>File uploaded. Waiting for response.';
	}
	
	// Handle the progress
	function onprogressHandler(evt) {
	  var div = document.getElementById('progress');
	  var percent = evt.loaded/evt.total*100;
	  div.innerHTML = 'Progress: ' + percent + '%';
	}
	
	// Handle the response from the server
	function onreadystatechangeHandler(evt) {
	  var status, text, readyState;
	  try {
	    readyState = evt.target.readyState;
	    text = evt.target.responseText;
	    status = evt.target.status;
	  }
	  catch(e) {
	    return;
	  }
	  if (readyState == 4 && status == '200' && evt.target.responseText) {
	    var status = document.getElementById('upload-status');
	    status.innerHTML += '<' + 'br>Success!';
	    var result = document.getElementById('result');
	    result.innerHTML = '<p>The server saw it as:</p><pre>' + evt.target.responseText + '</pre>';
	  }
	}
	*/

}(window, jQuery));
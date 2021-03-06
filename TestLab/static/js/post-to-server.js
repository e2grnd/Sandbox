(function (GLOBAL, $) {

	var percent, status, readyState, myVar = 1; 
	
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
	  
	  notice.innerHTML = "Upload VTK/EX2 File to Server";
	  uploadBtn.removeAttribute('disabled');
	  
	  // Initialize the file upload
	  initFileAjaxUpload();
	  
	}
	
	function initFileAjaxUpload() {
		
	  var uploadBtn = document.getElementById('upload-button-id');
	  
	  uploadBtn.onclick = function (evt) {
		  
	    var formData = new FormData();
	    
	    var hostIP = "104.196.6.101";
	    //var hostIP = "104.196.120.212";
	    //var hostIP = "104.196.122.159";
	    
	    var destinationURI = "https://" + hostIP + "/uploadFile.php";
	    
	    // FAppend the file to FormData - dummy change
	    var fileInput = document.getElementById('file-id');
	    var file_data = fileInput.files[0];
	    formData.append('file', file_data);   
	    
	    //Could also use ajax directly, by both uncommenting this ajax
	    //code and commenting out the below sendXHRequest(...)
	    /* 
	    $.ajax({
	        url: destinationURI,
	        type: "POST",
	        data: formData,
	        cache: false,
	        processData: false,
	        contentType: false,
	        success: function(php_script_response){
                alert(php_script_response); // display response from the PHP script, if any
            },
	        error: function(response) {
	        	alert("failed");
	        }
	     });
	     */
	         
	    // Send XMLHttpRequest 
	    sendXHRequest(formData, destinationURI);
	    
	    poll(
	    function(){
	    	return (readyState == 4 && status == '200');
	    }, 
	    getFileName, 
	    function(){
	    	console.log('An Error Occurred');
	    	},
	    300000, 
	    200)

	  }
	}
	
	
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
	}
	
	
	
	// Handle the end of the transmission
	function onloadHandler(evt) {
		//var div = document.getElementById('upload-status');
		//div.innerHTML += '<' + 'br>File uploaded. Waiting for response.';
	}
	
	
	// Handle the progress
	function onprogressHandler(evt) {
	    var div = document.getElementById('progress');
	    percent = evt.loaded/evt.total*100;
	    percent = percent.toFixed(2)
	    div.innerHTML = 'Upload Progress: ' + percent + '%';
	}
	
	// Handle the response from the server
	function onreadystatechangeHandler(evt) {
	  var text;
	  var div2 = document.getElementById('result');
	  try {
	    readyState = evt.target.readyState;
	    text = evt.target.responseText;
	    status = evt.target.status;
	  }
	  catch(e) {
	    return;
	  }
	  
	  if (readyState == 4 && status == '200') {
		  //div2.innerHTML = 'Upload Successful';
	  } 
	}
	
	function getFileName() {
		
	    var fullPath = document.getElementById('file-id').value;
	    
		if (fullPath) {
			var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
			var filename = fullPath.substring(startIndex);
			if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
				filename = filename.substring(1);
			}
		    var sourceName = "embedViz?file=" + filename
		    var frameChanges = document.getElementById('iframe1');
		    frameChanges.src = sourceName;	
		}
		
	}
	
	function poll(fn, callback, errback, timeout, interval) {
	    var endTime = Number(new Date()) + (timeout || 2000);
	    interval = interval || 100;

	    (function p() {
	            // If the condition is met, we're done! 
	            if(fn()) {
	                callback();
	            }
	            // If the condition isn't met but the timeout hasn't elapsed, go again
	            else if (Number(new Date()) < endTime) {
	                setTimeout(p, interval);
	            }
	            // Didn't match and too much time, reject!
	            else {
	                errback(new Error('timed out for ' + fn + ': ' + arguments));
	            }
	    })();
	}

}(window, jQuery));
(function (GLOBAL, $) {

	function initFileAjaxUpload() {
		
	  var uploadBtnName = document.getElementById('upload-button-id');
	  
	  uploadBtnName.onclick = function (evt) {
		  
		    var fullPath = document.getElementById('file-id').value;

			if (fullPath) {
				var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
				var filename = fullPath.substring(startIndex);
				if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
					filename = filename.substring(1);
				}
				alert(filename);
			}
	    
	  }
	}	
	
}(window, jQuery));
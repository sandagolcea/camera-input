window.onload = function(){ 
  /* Upload image */
  var input = document.querySelector('input[type=file]');

  input.onchange = function () {
    var file = input.files[0];
    displayAsImage(file);
  };

  function displayAsImage(file) {
    var imgURL = URL.createObjectURL(file),
        img = document.createElement('img');

    img.onload = function() {
      URL.revokeObjectURL(imgURL);
    };

    img.src = imgURL;
    document.body.appendChild(img);
  }

  /* Get video/camera stream and snapshot */
  /* Checking that the video capabilities are supported */
  function hasGetUserMedia() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
  }

  if (hasGetUserMedia()) {
    console.log("Good to go!");
  } else {
    alert('getUserMedia() is not supported in your browser');
  }

  var canvas =  document.querySelector('canvas');
  var context = canvas.getContext('2d');
  var video = document.querySelector('video');
  var button = document.querySelector('#capture-button');
  var buttonsnap = document.querySelector('#snapshot-button');
  var localMediaStream = null;
  var img = document.querySelector('img');

  navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

  function snapshot() {
    if (localMediaStream) {
      context.drawImage(video, 0, 0);
      img.src = canvas.toDataURL('image/webp');
    }
  }
  var errorCallback = function(err) {
    console.log('Error: ', err);
  };

  button.onclick = function () { 
    if (navigator.getUserMedia) {
      navigator.getUserMedia({video: true}, function(stream) {
        video.src = window.URL.createObjectURL(stream);
        localMediaStream = stream;
      }, errorCallback);
    }
  };
  
  buttonsnap.onclick = function () { 
    snapshot();
    localMediaStream.getTracks()[0].stop();
  }
};

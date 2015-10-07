window.onload = function(){ 
  /*Image Input*/
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

  /*video snapshot functions*/
  function hasGetUserMedia() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
  }

  if (hasGetUserMedia()) {
    console.log("Good to go!");
  } else {
    alert('getUserMedia() is not supported in your browser');
  }

  var errorCallback = function(err) {
    console.log('Error: ', err);
  };
  // Chrome specific
  // navigator.webkitGetUserMedia(
  //   {"video": true, "audio": true}, 
  //   function(s){
  //     document.querySelector('video').src = 
  //       window.webkitURL.createObjectURL(s);
  //   }, 
  //   function(e){console.log(e);}
  // );
  
  var canvas =  document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  var video = document.querySelector('video');
  var localMediaStream = null;

  navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

  var errorCallback = function(err) {
  console.log('Error:', err);
  };
//   if (navigator.getUserMedia) {
//     navigator.getUserMedia({video: true, audio: true}, function(localMediaStream) {
//       var video = document.querySelector('video');
//       video.src = window.URL.createObjectURL(localMediaStream);

//       video.onloadedmetadata = function(e) {
//         console.log('loaded meta data.');
//         // Ready to go. Do some stuff.
//         // video.play();
//       };
//     }, errorCallback);
//   } else {
//    console.log("getUserMedia not supported");
// }

  function snapshot() {
    if (localMediaStream) {
      ctx.drawImage(video, 0, 0);
      // ctx.drawImage(video, 50, 50, 100, 120, 10, 0, 250, 250);
      // "image/webp" works in Chrome.
      // Other browsers will fall back to image/png.
      document.querySelector('img').src = canvas.toDataURL('image/webp');
      /*
      var img = document.createElement('img');
      img.src = 'img_the_scream.jpg';
      img.onload = function () {
      var c = document.getElementById('myCanvas');
      var ctx = c.getContext('2d');
      ctx.drawImage(img,10,10,250,277);
      */
    }
  }

  var button = document.querySelector('#capture-button');
  // button.addEventListener('click', snapshot, false);
  // video.addEventListener('click', snapshot, false);
  button.onclick = function () { 
    console.log('button clicked');
     if (navigator.getUserMedia) {
        navigator.getUserMedia({video: true}, function(stream) {
          video.src = window.URL.createObjectURL(stream);
          localMediaStream = stream;
          // video.play();
      }, errorCallback);
    }
  };  
  var buttonsnap = document.querySelector('#snapshot-button');
  buttonsnap.onclick = function () { 
    console.log('snapshot clicked');
    snapshot();
  }
};

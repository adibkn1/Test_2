// Import the necessary Camera Kit modules.
import {
    bootstrapCameraKit,
    createMediaStreamSource,
  } from '@snap/camera-kit';
  
  // Create an async function to initialize Camera Kit and start the video stream.
  (async function() {
    // Bootstrap Camera Kit using your API token.
    const cameraKit = await bootstrapCameraKit({
      apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzA2NzExNzk4LCJzdWIiOiJhNWQ0ZjU2NC0yZTM0LTQyN2EtODI1Ni03OGE2NTFhODc0ZTR-U1RBR0lOR35mMzBjN2JmNy1lNjhjLTRhNzUtOWFlNC05NmJjOTNkOGIyOGYifQ.xLriKo1jpzUBAc1wfGpLVeQ44Ewqncblby-wYE1vRu0'
    });
  
    // Create a new CameraKit session.
    const session = await cameraKit.createSession();
  
    // Replace the `canvas` element with the live output from the CameraKit session.
    const canvasElement = document.getElementById('canvas');
    console.log('Canvas Element:', canvasElement);
    
    // Add conditional check for the existence of canvasElement
    if (canvasElement) {
      canvasElement.replaceWith(session.output.live);
  } else {
      console.error('Canvas element not found. Check your HTML for the element with id="canvas".');
  }
      
    // Load the specified lens group.
    const { lenses } = await cameraKit.lensRepository.loadLensGroups(['6233ba89-977d-4d59-8ceb-97b4a8466794'])
    console.log('Loaded Lenses:', lenses);

    // Apply the first lens in the lens group to the CameraKit session.
    session.applyLens(lenses[0]);
  
    // Get the user's media stream.
    let mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
  
    // Create a CameraKit media stream source from the user's media stream.
    const source = createMediaStreamSource(
      mediaStream, { cameraType: 'back' }
    );
  
    // Set the source of the CameraKit session.
    await session.setSource(source);
  
    // Set the render size of the CameraKit session to the size of the browser window.
    session.source.setRenderSize(3840, 2160); // 4K resolution (adjust as needed)
  
    // Start the CameraKit session.
    session.play(); 
  })();
  
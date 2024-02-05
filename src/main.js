  import { bootstrapCameraKit, Transform2D } from "@snap/camera-kit";

window.addEventListener("load", async () => {
    try {
        const cameraKit = await bootstrapCameraKit({ apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzA2NzExNzk4LCJzdWIiOiJhNWQ0ZjU2NC0yZTM0LTQyN2EtODI1Ni03OGE2NTFhODc0ZTR-U1RBR0lOR35mMzBjN2JmNy1lNjhjLTRhNzUtOWFlNC05NmJjOTNkOGIyOGYifQ.xLriKo1jpzUBAc1wfGpLVeQ44Ewqncblby-wYE1vRu0'});

        const session = await cameraKit.createSession();

        session.events.addEventListener("error", (event) => console.error(event.detail));

        const canvasElement = document.getElementById('canvas');
        if (canvasElement) {
            canvasElement.replaceWith(session.output.live);
        } else {
            console.error('Canvas element not found. Check your HTML for the element with id="canvas".');
        }

        const { lenses } = await cameraKit.lensRepository.loadLensGroups(['f6ec2d36-229a-49c7-ba9d-847d7f287515']);

        createLensSelect("lens-select", lenses, async (lens) => {
            await session.applyLens(lens)
        });

        createSourceSelect(
            "source-select",
            async (source) => {
                try {
                    await session.setSource(source);
                    source.setTransform(Transform2D.MirrorX);
                    const shouldUsePortrait = parent.document.body.offsetWidth <= breakpoints.xs;
                    if (shouldUsePortrait) {
                        source.setRenderSize(480, 640);
                    }
                } catch (error) {
                    console.error(error);
                    throw error;
                }
                session.play("live");
            },
        );

    } catch (error) {
      console.error(error);
    }
});


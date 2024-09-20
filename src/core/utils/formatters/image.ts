export const resizeBase64 = (url: string) => {
  return new Promise((resolve) => {
    const image = new Image();

    image.addEventListener("load", () => {
      let canvas: HTMLCanvasElement = document.createElement("canvas");
      if (canvas === null) {
        return;
      }
      canvas.width = 640;
      canvas.height = 480;
      let ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

      if (ctx !== null) {
        ctx?.drawImage(image, 0, 0);
        const imageURI = canvas.toDataURL("image/jpeg");

        resolve(imageURI);
      }
    });

    image.src = url;
  });
};

const canvas = document.querySelector("[data-target]");
const ctx = canvas?.getContext("2d");

const FILE_PATH = "/assets/img/";
const IMAGES_COUNT = 5; // 画像の枚数に応じて変更
const AMOUNT = 300;

const images = [];

// 画像描画関数
const draw = (index) => {
  // キャンバスに描画
  ctx.drawImage(images[index], 0, 0, canvas.clientWidth, canvas.clientHeight);
};

// 画像読み込み用関数
const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = src;

    // 画像の読み込みを監視
    image.addEventListener("load", () => {
      // canvasに描画
      resolve(image);
    });

    image.addEventListener("error", () => {
      reject();
    });
  });
};

const preloadImage = async () => {
  for (let index = 1; index <= IMAGES_COUNT; index++) {
    const image = await loadImage(`${FILE_PATH}${index}.jpg`);
    images.push(image);
  }
};

const frameAnimation = () => {
  const index = Math.floor(scrollY / AMOUNT);
  const currentIndex = Math.min(index, IMAGES_COUNT - 1);
  draw(currentIndex);
};

const init = async () => {
  await preloadImage();
  frameAnimation();
  window.addEventListener("scroll", frameAnimation);
};

init();

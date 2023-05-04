// contentScript.ts
console.log('content script loaded');
function copyTextToClipboard(text: string) {
  navigator.clipboard.writeText(text).catch((err) => {
    console.error('Error copying text: ', err);
  });
}

function createCopyButton(text: string): HTMLButtonElement {
  const button = document.createElement('button');
  button.textContent = 'コピー';
  button.addEventListener('click', () => {
    copyTextToClipboard(text);
  });
  // CSSスタイルを適用する
  button.style.backgroundColor = 'blue';
  button.style.color = 'white';
  button.style.borderRadius = '4px';
  button.style.padding = '4px 8px';
  return button;
}

function insertCopyButtons() {
  console.log('コピーボタンを挿入します。')
  const chatGPTQuestionSelector = '#__next > div.overflow-hidden.w-full.h-full.relative.flex > div.flex.h-full.max-w-full.flex-1.flex-col.overflow-hidden > main > div.flex-1.overflow-hidden > div > div > div > div:nth-child(n) > div'

  const paragraphs = document.querySelectorAll(chatGPTQuestionSelector);
  paragraphs.forEach((paragraph) => {
    const text = paragraph.textContent || '';
    const copyButton = createCopyButton(text);
    paragraph.insertAdjacentElement('afterend', copyButton);
  });
}

// 回答のセレクタ
// #__next > div.overflow-hidden.w-full.h-full.relative.flex > div.flex.h-full.max-w-full.flex-1.flex-col.overflow-hidden > main > div.flex-1.overflow-hidden > div > div > div > div:nth-child(5) > div

// Run the function when the page is fully loaded
window.addEventListener('load', () => {
  insertCopyButtons();
});

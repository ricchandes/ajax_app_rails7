const buildHTML = (XHR) => {
  const item = XHR.response.post;   //responseにはサーバーからのレスポンスに関する情報が格納されてる レスポンスの中から投稿されたメモの情報を抽出
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};

function post (){
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {  //コントローラーに送るリクエストを書いていくよ
      e.preventDefault();                 //イベントがおこってもこの記述によってアクションは起こらない
    const formData = new FormData(form);  //フォームからの値を格納
    const XHR = new XMLHttpRequest();    //新しくオブジェクトを生成  サーバーとHTTP通信を行うために必要です お手紙のあて名書きみたいな
    XHR.open("POST", "/posts", true);    //リクエスト内容を記述①HTTPメッソドの指定2パスの指定③非同期通信か？ 行先
    XHR.responseType = "json";           //サーバーサイドからのレスポンスの形式を指定   返ってきたときの郵便の種類書いておくよ
    XHR.send(formData);                //フォームをサーバー側に送信

    XHR.onload = () => {  //リクエストの送信に成功したときの処理を書いていくよ
      if (XHR.status != 200) {                      //リクエストに失敗したときの場合
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      };
      const list = document.getElementById("list");
      const formText = document.getElementById("content");   //フォームをリセットするためにクラス名を呼び出してきた⇒13行目へ
      list.insertAdjacentHTML("afterend", buildHTML(XHR));  //insertAdjanceメソッドHTMLをある要素の指定した箇所に挿入する
        formText.value = "";     //処理が終わったらフォームをリセットしてる
    };
  });
};

window.addEventListener('turbo:load', post);
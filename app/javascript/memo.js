function post (){
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {  //コントローラーに送るリクエストを書いていくよ
      e.preventDefault();
    const formData = new FormData(form);  //フォームからの値を格納
    const XHR = new XMLHttpRequest();    //新しくオブジェクトを生成  サーバーとHTTP通信を行うために必要です お手紙のあて名書きみたいな
    XHR.open("POST", "/posts", true);    //リクエスト内容を記述①HTTPメッソドの指定2パスの指定③非同期通信か？ 行先
    XHR.responseType = "json";           //サーバーサイドからのレスポンスの形式を指定   返ってきたときの郵便の種類書いておくよ
    XHR.send(formData);                //フォームをサーバー側に送信
  });
};

window.addEventListener('turbo:load', post);
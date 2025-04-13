// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getDatabase,
    ref,
    set,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzje5-iL_hI2hlrJsS6aorsIs-ZPMqMpo",
  authDomain: "kaidrum-8c957.firebaseapp.com",
  databaseURL: "https://kaidrum-8c957-default-rtdb.firebaseio.com",
  projectId: "kaidrum-8c957",
  storageBucket: "kaidrum-8c957.firebasestorage.app",
  messagingSenderId: "710792220659",
  appId: "1:710792220659:web:523db5384fcb174b5a0c86",
  measurementId: "G-QMKSGH6ZHZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 查詢函式
window.searchCandidate = async function () {
    const searchID = document.getElementById("searchID").value.trim();
    const resultDiv = document.getElementById("result");

    if (!searchID) {
        alert("請輸入報名編號！");
        return;
    }

    try {
        const snapshot = await get(ref(db, `candidate/${searchID}`));
        if (snapshot.exists()) {
            const data = snapshot.val();
            resultDiv.innerHTML = `
                <p><strong>姓名：</strong>${data.NAME}</p>
                <p><strong>生日：</strong>${data.BIRTH}</p>
                <p><strong>地址：</strong>${data.ADDRESS}</p>
                <p><strong>信箱：</strong>${data.EMAIL}</p>
                <p><strong>電話：</strong>${data.PHONE}</p>
                <p><strong>指導老師：</strong>${data.TEACHER}</p>
                <p><strong>曲目：</strong>${data.SONG}</p>
                <p><strong>組別：</strong>${data.GROUP}</p>
                <p><strong>帳號後五碼：</strong>${data.PAY}</p>
                <p><strong>報名時間：</strong>${data.TIMESTAMP}</p>
            `;
        } else {
            resultDiv.innerHTML = "<p style='color:red;'>找不到這筆報名資料。</p>";
        }
    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = `<p style='color:red;'>發生錯誤：${error.message}</p>`;
    }
};

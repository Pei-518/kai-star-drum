window.todo = async function () {
    console.log("SUBMITED");
    // alert("SUBMITED");
    check_form();
};

// datas to set
window.check_form = async function () {
    const form = document.getElementById("FORM");

    const fields = {
        NAME: "姓名",
        BIRTH: "生日",
        ADDRESS: "聯絡地址",
        EMAIL: "聯絡信箱",
        PHONE: "聯絡電話",
        TEACHER: "指導老師",
        SONG: "曲目(作者-曲名)",
        GROUP: "報名組別",
        PAYMENT: "帳號後五碼",
        // ADDITIONAL: "加報項目",
    };

    let emptyFields = [];
    let firstEmptyField = null;

    for (let [id, label] of Object.entries(fields)) {
        const field = form[id];
        // alert(`${label} ${field.value}`);
        if (!field.value) {
            emptyFields.push(label);
            field.style.borderColor = "red";
            if (!firstEmptyField) {
                firstEmptyField = field;
            }
        } else {
            field.style.borderColor = "";
        }
    }

    if (emptyFields.length > 0) {
        alert(`請填寫以下必填欄位：\n${emptyFields.join("\n")}`);
        setTimeout(() => {
            if (firstEmptyField) {
                firstEmptyField.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
                firstEmptyField.focus();
            }
        }, 0);
        return;
    }

    const CandidateID = Date.now() + Math.floor(Math.random() * 1000);
    const candidate = new Candidate({
        id: CandidateID,
        name: form.NAME.value,
        birth: form.BIRTH.value,
        address: form.ADDRESS.value,
        email: form.EMAIL.value,
        phoneNumber: form.PHONE.value,
        teacher: form.TEACHER.value,
        song: form.SONG.value,
        group: form.GROUP.value,
        payment: form.PAYMENT.value,
        additional: false,
    });
    console.log("obj created");
    await candidate.confirmInfo();
};

// db stuff
class Candidate {
    constructor(candidateData) {
        this.id = candidateData.id;
        this.name = candidateData.name;
        this.birth = candidateData.birth;
        this.address = candidateData.address;
        this.email = candidateData.email;
        this.phoneNumber = candidateData.phoneNumber;
        this.teacher = candidateData.teacher;
        this.song = candidateData.song;
        this.group = candidateData.group;
        this.payment = candidateData.payment;
        this.additional = candidateData.additional;
    }

    async confirmInfo() {
        //const groupText = document.getElementById("GROUP").options[document.getElementById("GROUP").selectedIndex].text;
        const isConfirm = window.confirm(
            "請確認以下資訊是否正確\n 報名編號：" +
                this.id +
                "\n 姓名：" +
                this.name +
                "\n 生日：" +
                this.birth +
                "\n 聯絡地址：" +
                this.address +
                "\n 聯絡信箱：" +
                this.email +
                "\n 聯絡電話：" +
                this.phoneNumber +
                "\n 指導老師：" +
                this.teacher +
                "\n 曲目(作者-曲名)：" +
                this.song +
                "\n 報名組別：" +
                this.group +
                "\n 帳號後五碼：" +
                this.payment
        );
        if (isConfirm) {
            await writeUserData(this);
        } else {
            alert("你已取消送出報名表單!");
        }
    }
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getDatabase,
    ref,
    set,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import {
    initializeAppCheck,
    ReCaptchaV3Provider,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-check.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCzje5-iL_hI2hlrJsS6aorsIs-ZPMqMpo",
    authDomain: "kaidrum-8c957.firebaseapp.com",
    databaseURL: "https://kaidrum-8c957-default-rtdb.firebaseio.com",
    projectId: "kaidrum-8c957",
    storageBucket: "kaidrum-8c957.firebasestorage.app",
    messagingSenderId: "710792220659",
    appId: "1:710792220659:web:523db5384fcb174b5a0c86",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(
        "6LfMbxYrAAAAAJsEFzgWXYdKleqpeTTyQ48_6iRG"
    ),

    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true,
});

async function writeUserData(candidateData) {
    const db = getDatabase();
    const dt = new Date().toString();
    set(ref(db, `/candidate/${candidateData.id}`), {
        NAME: candidateData.name,
        BIRTH: candidateData.birth,
        ADDRESS: candidateData.address,
        EMAIL: candidateData.email,
        PHONE: candidateData.phoneNumber,
        TEACHER: candidateData.teacher,
        SONG: candidateData.song,
        GROUP: candidateData.group,
        PAYMENT: candidateData.payment,
        ADDITIONAL: candidateData.additional,
        TIMESTAMP: dt,
    })
        .then(function () {
            console.log("Data written successfully");
            alert(
                "報名成功！\n請於繳費時間內繳納完畢並完成匯款登記，感謝您的配合！\n\n匯款帳號：(822)29954-1144-281"
            );
            window.location.href = "./index.html";
        })
        .catch(function (error) {
            console.error("Error writing data: ", error);
            alert("伺服器發生錯誤，請稍後再試\n錯誤訊息: " + error.message);
        });
}
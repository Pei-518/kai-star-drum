// Firebase 配置和初始化
const firebaseConfig = {
    apiKey: "你的apiKey",
    authDomain: "你的authDomain",
    databaseURL: "你的databaseURL",
    projectId: "你的projectId",
    storageBucket: "你的storageBucket",
    messagingSenderId: "你的messagingSenderId",
    appId: "你的appId"
};

// 導入 firebase
firebase.initializeApp(firebaseConfig);

// 獲取數據庫實例
const database = firebase.database();

// 寫入數據的函數
function writeToDatabase(path, data) {
    database.ref(path).set(data, (error) => {
        if (error) {
            console.log('寫入發生錯誤:', error);
        } else {
            console.log('數據寫入成功！');
        }
    });
}

// 使用範例
writeToDatabase('users/user1', {
    name: '張三',
    email: 'zhang@example.com',
    timestamp: new Date().toISOString()
});
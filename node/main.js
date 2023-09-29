const https = require("https");
const express = require("express");
const app = express();
const line = require("@line/bot-sdk");
const PORT = process.env.PORT || 3000; //
const mysql = require("mysql");
var r = 1;
var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "line_chatbot",
});

connection.connect(function (err) {
  if (err) {
    console.log("เชื่อมต่อไม่สำเร็จ:", err);
  } else {
    console.log("เชื่อมต่อสำเร็จ!");
  }
});
const TOKEN =
  "EzxAy+QDj3ldrAdo8UOcxcaUQ08fKxZrYL5hwwrWYcIZ0vhYiRFU/G5QCQ/RYVdQk50p3la+e6mN4LlvQ5d70/O+CrXvEt9VDk1Qcp7cMkSrsfxKQj0KV3BAY55fwlPM9dEZPCLI +HyC36Qr1r0NZwdB04t89/1O/w1cDnyilFU="; // ============= เพิ่มเข้ามาใหม่
const config = {
  channelAccessToken:
    "EzxAy+QDj3ldrAdo8UOcxcaUQ08fKxZrYL5hwwrWYcIZ0vhYiRFU/G5QCQ/RYVdQk50p3la+e6mN4LlvQ5d70/O+CrXvEt9VDk1Qcp7cMkSrsfxKQj0KV3BAY55fwlPM9dEZPCLI +HyC36Qr1r0NZwdB04t89/1O/w1cDnyilFU=",
  channelSecret: "1e61f30e554d804aa83570fe755e5e89",
};
const client = new line.Client(config);

var dataString = "";

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("สวัสดี express webhook");
});

app.post("/webhook", async (req, res) => {
  console.log(
    "req.body =>",
    JSON.stringify(req.body.events[0].message, null, 2)
  );
  res.send("HTTP POST request sent to the webhook URL!");

  // ============= เพิ่มเข้ามาใหม่
  if (req.body.events[0].type === "message") {
    const lineUserId = req.body.events[0].source.userId;

    // สร้างคำสั่ง SQL สำหรับการตรวจสอบข้อมูลในวันนี้
    const checkQuery =
      "SELECT * FROM failed_chats WHERE line_id = ? AND DATE(created_at) = CURDATE()";

    connection.query(checkQuery, [lineUserId], function (err, results, fields) {
      if (err) {
        console.error("Error checking database: ", err);
      } else {
        // ถ้าไม่มีข้อมูลในวันนี้
        if (results.length === 0) {
          // ดึงข้อมูลผู้ใช้ LINE
          client
            .getProfile(lineUserId)
            .then((profile) => {
              const userName = profile.displayName;
              const userProfileImage = profile.pictureUrl;

              // แทรกข้อมูลลงในฐานข้อมูล
              connection.query(
                "INSERT INTO failed_chats (line_id, user_name, user_profile) VALUES (?, ?, ?)",
                [lineUserId, userName, userProfileImage],
                function (err, _results, fields) {
                  if (err) {
                    console.log(
                      "Failed to insert LINE ID and user name into database."
                    );
                  } else {
                    console.log(
                      "LINE ID and user name inserted into database."
                    );
                  }
                }
              );
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          console.log("Data for LINE ID already exists for today.");
        }
      }
    });

    const uMessage = req.body.events[0].message.text;
    if (uMessage.includes("คำถามที่พบบ่อย")) {
      dataString = JSON.stringify({
        replyToken: req.body.events[0].replyToken,
        messages: [
          {
            type: "imagemap",
            baseUrl: "https://sv1.picz.in.th/images/2023/09/21/dWLfBXg.png",
            altText: "This is an imagemap",
            baseSize: {
              width: 1040,
              height: 701,
            },
            actions: [
              {
                type: "uri",
                area: {
                  x: 21,
                  y: 18,
                  width: 309,
                  height: 316,
                },
                linkUri:
                  "https://web.facebook.com/sskruthailand.connect/photos/a.143105915772348/2307159932700258/",
              },
              {
                type: "uri",
                area: {
                  x: 364,
                  y: 19,
                  width: 312,
                  height: 317,
                },
                linkUri: "https://www.sskru.ac.th/application-channel/",
              },
              {
                type: "uri",
                area: {
                  x: 713,
                  y: 19,
                  width: 308,
                  height: 313,
                },
                linkUri: "http://www.oass.sskru.ac.th/text/3207.PDF",
              },
              {
                type: "uri",
                area: {
                  x: 710,
                  y: 364,
                  width: 312,
                  height: 320,
                },
                linkUri: "https://www.sskru.ac.th/calendar/",
              },
              {
                type: "uri",
                area: {
                  x: 359,
                  y: 370,
                  width: 316,
                  height: 313,
                },
                linkUri: "http://www.oass.sskru.ac.th/cu.591.html",
              },
              {
                type: "uri",
                area: {
                  x: 21,
                  y: 369,
                  width: 309,
                  height: 313,
                },
                linkUri: "https://web.facebook.com/groups/523263184384963",
              },
            ],
          },
        ],
      });
    } else if (uMessage.includes("อื่นๆ")) {
      dataString = JSON.stringify({
        replyToken: req.body.events[0].replyToken,
        messages: [
          {
            type: "imagemap",
            baseUrl: "https://sv1.picz.in.th/images/2023/09/23/dWmZBlW.png",
            altText: "This is an imagemap",
            baseSize: {
              width: 1040,
              height: 702,
            },
            actions: [
              {
                type: "uri",
                area: {
                  x: 13,
                  y: 13,
                  width: 1012,
                  height: 313,
                },
                linkUri: "https://www.sskru.ac.th/",
              },
              {
                type: "uri",
                area: {
                  x: 13,
                  y: 358,
                  width: 319,
                  height: 315,
                },
                linkUri: "https://web.facebook.com/sskruofficial/?_rdc=1&_rdr",
              },
              {
                type: "message",
                area: {
                  x: 363,
                  y: 365,
                  width: 306,
                  height: 308,
                },
                text: "เพจคณะต่างๆ",
              },
              {
                type: "message",
                area: {
                  x: 712,
                  y: 354,
                  width: 302,
                  height: 315,
                },
                text: "เพจสาขาต่างๆ",
              },
            ],
          },
        ],
      });
    } else if (uMessage.includes("เพจคณะต่างๆ")) {
      dataString = JSON.stringify({
        replyToken: req.body.events[0].replyToken,
        messages: [
          {
            type: "template",
            altText: "this is an image carousel template",
            template: {
              type: "image_carousel",
              columns: [
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/23/dWmQXJb.png",
                  action: {
                    type: "uri",
                    label: "LASC",
                    uri: "https://www.facebook.com/lascsskru",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/23/dWmQVoJ.png",
                  action: {
                    type: "uri",
                    label: "HUSO",
                    uri: "https://www.facebook.com/SSKRUHUSO",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/23/dWmQUHl.png",
                  action: {
                    type: "uri",
                    label: "LAGO",
                    uri: "https://www.facebook.com/sskruclg/",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/23/dWmQooQ.png",
                  action: {
                    type: "uri",
                    label: "BAAC",
                    uri: "https://www.facebook.com/baac.sskru",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/23/dWmQ5Sk.png",
                  action: {
                    type: "uri",
                    label: "EDUC",
                    uri: "https://www.facebook.com/edu.sskru.ac.th/",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/23/dWmUean.png",
                  action: {
                    type: "uri",
                    label: "สาขาวิชาพย..",
                    uri: "https://www.facebook.com/Nursingsisaket",
                  },
                },
              ],
            },
          },
        ],
      });
    } else if (uMessage.includes("เพจสาขาต่างๆ")) {
      dataString = JSON.stringify({
        replyToken: req.body.events[0].replyToken,
        messages: [
          {
            type: "imagemap",
            baseUrl: "https://sv1.picz.in.th/images/2023/09/23/dWmCFWZ.png",
            altText: "This is an imagemap",
            baseSize: {
              width: 1040,
              height: 1300,
            },
            actions: [
              {
                type: "message",
                area: {
                  x: 32,
                  y: 11,
                  width: 997,
                  height: 129,
                },
                text: "สาขาในคณะพยาบาลศาสตร์",
              },
              {
                type: "message",
                area: {
                  x: 32,
                  y: 167,
                  width: 993,
                  height: 131,
                },
                text: "สาขาในคณะศิลปศาสตร์และวิทยาศาสตร์(1)",
              },
              {
                type: "message",
                area: {
                  x: 28,
                  y: 317,
                  width: 997,
                  height: 141,
                },
                text: "สาขาในคณะศิลปศาสตร์และวิทยาศาสตร์(2)",
              },
              {
                type: "message",
                area: {
                  x: 34,
                  y: 486,
                  width: 989,
                  height: 128,
                },
                text: "สาขาในคณะมนุษยศาสตร์และสังคมศาสตร์",
              },
              {
                type: "message",
                area: {
                  x: 43,
                  y: 642,
                  width: 982,
                  height: 131,
                },
                text: "สาขาในวิทยาลัยกฎหมายและการปกครอง",
              },
              {
                type: "message",
                area: {
                  x: 35,
                  y: 803,
                  width: 983,
                  height: 123,
                },
                text: "สาขาในคณะคณะบริหารธุรกิจและการบัญชี",
              },
              {
                type: "message",
                area: {
                  x: 27,
                  y: 966,
                  width: 991,
                  height: 135,
                },
                text: "สาขาในคณะคณะครุศาสตร์(1)",
              },
              {
                type: "message",
                area: {
                  x: 21,
                  y: 1127,
                  width: 1004,
                  height: 156,
                },
                text: "สาขาในคณะคณะครุศาสตร์(2)",
              },
            ],
          },
        ],
      });
    } else if (uMessage.includes("สาขาในคณะพยาบาลศาสตร์")) {
      dataString = JSON.stringify({
        replyToken: req.body.events[0].replyToken,
        messages: [
          {
            type: "template",
            altText: "this is an image carousel template",
            template: {
              type: "image_carousel",
              columns: [
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/23/dWmUean.png",
                  action: {
                    type: "uri",
                    label: "สาขาวิชาพย..",
                    uri: "https://www.facebook.com/Nursingsisaket",
                  },
                },
              ],
            },
          },
        ],
      });
    } else if (uMessage.includes("สาขาในวิทยาลัยกฎหมายและการปกครอง")) {
      dataString = JSON.stringify({
        replyToken: req.body.events[0].replyToken,
        messages: [
          {
            type: "template",
            altText: "this is an image carousel template",
            template: {
              type: "image_carousel",
              columns: [
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/23/dWm8fqW.png",
                  action: {
                    type: "uri",
                    label: "รัฐประศาสน..",
                    uri: "https://www.facebook.com/P.A.SSKRU/",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/23/dWm84vn.png",
                  action: {
                    type: "uri",
                    label: "นิติศาสตร์",
                    uri: "https://www.facebook.com/profile.php?id=100063469093786",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/23/dWm8h82.png",
                  action: {
                    type: "uri",
                    label: "รัฐศาสตร์",
                    uri: "https://www.facebook.com/profile.php?id=100054263929964",
                  },
                },
              ],
            },
          },
        ],
      });
    } else if (uMessage.includes("สาขาในคณะศิลปศาสตร์และวิทยาศาสตร์(1)")) {
      dataString = JSON.stringify({
        replyToken: req.body.events[0].replyToken,
        messages: [
          {
            type: "template",
            altText: "this is an image carousel template",
            template: {
              type: "image_carousel",
              columns: [
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmXZGQ.png",
                  action: {
                    type: "uri",
                    label: "วิท-คอม",
                    uri: "https://www.facebook.com/comsci.sskru",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmXgfS.png",
                  action: {
                    type: "uri",
                    label: "ซอฟต์แวร์",
                    uri: "https://www.facebook.com/software.sskru",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmXiqn.png",
                  action: {
                    type: "uri",
                    label: "โลจิสติกส์",
                    uri: "https://www.facebook.com/lgensskru",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmXQSW.png",
                  action: {
                    type: "uri",
                    label: "ดิจิทัล ",
                    uri: "https://www.facebook.com/Comtechsskru",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmXUg2.png",
                  action: {
                    type: "uri",
                    label: "เกษตร ",
                    uri: "https://www.facebook.com/AgriTechLascSskru/",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmXD5f.png",
                  action: {
                    type: "uri",
                    label: "สถาปัตยกรรม ",
                    uri: "https://www.facebook.com/civilsskru",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmXsSq.png",
                  action: {
                    type: "uri",
                    label: "อุตสาหกรรม ",
                    uri: "https://www.facebook.com/imtsskru",
                  },
                },
              ],
            },
          },
        ],
      });
    } else if (uMessage.includes("สาขาในคณะศิลปศาสตร์และวิทยาศาสตร์(2)")) {
      dataString = JSON.stringify({
        replyToken: req.body.events[0].replyToken,
        messages: [
          {
            type: "template",
            altText: "this is an image carousel template",
            template: {
              type: "image_carousel",
              columns: [
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmafL9.png",
                  action: {
                    type: "uri",
                    label: "ออกแบบ",
                    uri: "https://www.facebook.com/Designsskru/",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWma3Eb.png",
                  action: {
                    type: "uri",
                    label: "สิ่งแวดล้อม ",
                    uri: "https://www.facebook.com/EnviSSKRU",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWma9Xf.png",
                  action: {
                    type: "uri",
                    label: "วิท-กีฬา ",
                    uri: "https://www.facebook.com/SportsScience.sskru",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmawRq.png",
                  action: {
                    type: "message",
                    label: "การอาหาร ",
                    text: "https://www.facebook.com/foodsciencelascsskru",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmac1R.png",
                  action: {
                    type: "uri",
                    label: "สาธารณสุข",
                    uri: "https://www.facebook.com/CMHSSKRU",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmaiLu.png",
                  action: {
                    type: "uri",
                    label: "อาชีวอนามัย",
                    uri: "https://www.facebook.com/Occ.Health.SSKRU",
                  },
                },
              ],
            },
          },
        ],
      });
    } else if (uMessage.includes("สาขาในคณะมนุษยศาสตร์และสังคมศาสตร์")) {
      dataString = JSON.stringify({
        replyToken: req.body.events[0].replyToken,
        messages: [
          {
            type: "template",
            altText: "this is an image carousel template",
            template: {
              type: "image_carousel",
              columns: [
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWma8W2.png",
                  action: {
                    type: "uri",
                    label: "ภาษาญี่ปุ่น",
                    uri: "https://www.facebook.com/japanese.sskru.ac.th/",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmajWk.png",
                  action: {
                    type: "uri",
                    label: "บรรณารักษ",
                    uri: "https://www.facebook.com/LSLMSKRU",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmaQEI.png",
                  action: {
                    type: "uri",
                    label: "นิเทศศาสตร์",
                    uri: "https://www.facebook.com/profile.php?id=100057097764013&mibextid=ZbWKwL",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWma2aS.png",
                  action: {
                    type: "uri",
                    label: "ศิลปะและการอ",
                    uri: "https://web.facebook.com/profile.php?id=100064815574159",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmaXeD.png",
                  action: {
                    type: "uri",
                    label: "ภาษาจีน",
                    uri: "https://web.facebook.com/profile.php?id=100005123088278",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmavOJ.png",
                  action: {
                    type: "uri",
                    label: "พัฒนาชุมชน",
                    uri: "https://web.facebook.com/profile.php?id=100069070694666",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmaexa.png",
                  action: {
                    type: "uri",
                    label: "ประวัติศาสตร",
                    uri: "https://web.facebook.com/historysskru",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmaFdz.png",
                  action: {
                    type: "uri",
                    label: "อังกฤษธุรกิจ",
                    uri: "https://web.facebook.com/pages/%E0%B8%AA%E0%B8%B2%E0%B8%82%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%8A%E0%B8%B2%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%B2%E0%B8%AD%E0%B8%B1%E0%B8%87%E0%B8%81%E0%B8%A4%E0%B8%A9%E0%B8%98%E0%B8%B8%E0%B8%A3%E0%B8%81%E0%B8%B4%E0%B8%88-%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2%E0%B8%A3%E0%B8%B2%E0%B8%8A%E0%B8%A0%E0%B8%B1%E0%B8%8E-%E0%B8%A8%E0%B8%A3%E0%B8%B5%E0%B8%AA%E0%B8%B0%E0%B9%80%E0%B8%81%E0%B8%A9/193089794643109",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmpWm0.png",
                  action: {
                    type: "uri",
                    label: "ไทย-สื่อสาร",
                    uri: "https://web.facebook.com/profile.php?id=100019958987221",
                  },
                },
              ],
            },
          },
        ],
      });
    } else if (uMessage.includes("สาขาในคณะคณะบริหารธุรกิจและการบัญชี")) {
      dataString = JSON.stringify({
        replyToken: req.body.events[0].replyToken,
        messages: [
          {
            type: "template",
            altText: "this is an image carousel template",
            template: {
              type: "image_carousel",
              columns: [
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmp03u.png",
                  action: {
                    type: "uri",
                    label: "การบัญชี ",
                    uri: "https://www.facebook.com/accsskru/",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmpSaI.png",
                  action: {
                    type: "uri",
                    label: "ธุรกิจต่างปร",
                    uri: "https://www.facebook.com/profile.php?id=100046052120043",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmp4Qt.png",
                  action: {
                    type: "message",
                    label: "ธุรกิจดิจิทั",
                    text: "https://www.facebook.com/DBC.SSKRU",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmpNne.png",
                  action: {
                    type: "uri",
                    label: "การค้าสมัยให",
                    uri: "https://www.facebook.com/MTMSSKRU?mibextid=ZbWKwL",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmpZQn.png",
                  action: {
                    type: "uri",
                    label: "การตลาด",
                    uri: "https://www.facebook.com/profile.php?id=100057031226973&mibextid=ZbWKwL",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmpRZ2.png",
                  action: {
                    type: "uri",
                    label: "การโรงแรม",
                    uri: "https://www.facebook.com/profile.php?id=100069980260182&mibextid=ZbWKwL",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmpxs1.png",
                  action: {
                    type: "uri",
                    label: "การจัดการ",
                    uri: "https://www.facebook.com/profile.php?id=100064336890636&mibextid=ZbWKwL",
                  },
                },
              ],
            },
          },
        ],
      });
    } else if (uMessage.includes("สาขาในคณะคณะครุศาสตร์(1)")) {
      dataString = JSON.stringify({
        replyToken: req.body.events[0].replyToken,
        messages: [
          {
            type: "template",
            altText: "this is an image carousel template",
            template: {
              type: "image_carousel",
              columns: [
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmpQmy.png",
                  action: {
                    type: "uri",
                    label: "ภาษาไทย",
                    uri: "https://www.facebook.com/profile.php?id=100057325305231",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmpq9D.png",
                  action: {
                    type: "uri",
                    label: "อังกฤษ",
                    uri: "https://www.facebook.com/edu.englishsskru?mibextid=ZbWKwL",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmp5j9.png",
                  action: {
                    type: "uri",
                    label: "ดนตรีศึกษา ",
                    uri: "https://web.facebook.com/MEDU.SSKRU/",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmpbNb.png",
                  action: {
                    type: "uri",
                    label: "คณิตศาสตร์",
                    uri: "https://www.facebook.com/MATHSSKRUPAGE",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmpjUf.png",
                  action: {
                    type: "uri",
                    label: "ภาษาจีน ",
                    uri: "https://www.facebook.com/SSKRUChineseTeaching",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmpuju.png",
                  action: {
                    type: "uri",
                    label: "สังคมศึกษา",
                    uri: "https://www.facebook.com/profile.php?id=100057569404771&mibextid=ZbWKwL",
                  },
                },
              ],
            },
          },
        ],
      });
    } else if (uMessage.includes("สาขาในคณะคณะครุศาสตร์(2)")) {
      dataString = JSON.stringify({
        replyToken: req.body.events[0].replyToken,
        messages: [
          {
            type: "template",
            altText: "this is an image carousel template",
            template: {
              type: "image_carousel",
              columns: [
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmv5Ik.png",
                  action: {
                    type: "uri",
                    label: "พลศึกษา",
                    uri: "https://www.facebook.com/profile.php?id=100053556284431&mibextid=ZbWKwL",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmvOtv.png",
                  action: {
                    type: "uri",
                    label: "วิทยาศาสตร์",
                    uri: "https://www.facebook.com/profile.php?id=100063631266051&mibextid=ZbWKwL",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmvboE.png",
                  action: {
                    type: "uri",
                    label: "คอมพิวเตอร์",
                    uri: "https://www.facebook.com/ComputerEducationSskru?mibextid=ZbWKwL",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmvofV.png",
                  action: {
                    type: "uri",
                    label: "การประถมศึกษ",
                    uri: "https://www.facebook.com/Elementary.Sskru?mibextid=ZbWKwL",
                  },
                },
                {
                  imageUrl:
                    "https://sv1.picz.in.th/images/2023/09/24/dWmvAVS.png",
                  action: {
                    type: "uri",
                    label: "ปฐมวัย",
                    uri: "https://www.facebook.com/earlychildhoodeducation.sskru?mibextid=ZbWKwL",
                  },
                },
              ],
            },
          },
        ],
      });
    } else {
      const lineUserId = req.body.events[0].source.userId;

      // สร้างคำสั่ง SQL สำหรับการตรวจสอบข้อมูลในวันนี้
      const checkQuery =
        "SELECT * FROM messages WHERE line_id = ? AND DATE(created_at) = CURDATE()";

      connection.query(
        checkQuery,
        [lineUserId],
        function (err, results, fields) {
          if (err) {
            console.error("Error checking database: ", err);
          } else {
            // ถ้าไม่มีข้อมูลในวันนี้
            if (results.length === 0) {
              // ดึงข้อมูลผู้ใช้ LINE
              client
                .getProfile(lineUserId)
                .then((profile) => {
                  const userProfileImage = profile.pictureUrl;
                  // แทรกข้อมูลลงในฐานข้อมูล
                  connection.query(
                    "INSERT INTO messages (line_id, profile, message) VALUES (?, ?, ?)",
                    [lineUserId, userProfileImage, uMessage],
                    function (err, _results, fields) {
                      if (err) {
                        console.log("Failed to insert message into database.");
                      } else {
                        console.log("message into database.");
                      }
                    }
                  );
                })
                .catch((error) => {
                  console.error(error);
                });
            } else {
              console.log("Data for LINE ID already exists for today.");
            }
          }
        }
      ); 
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + TOKEN,
    };

    // Options to pass into the request
    const webhookOptions = {
      hostname: "api.line.me",
      path: "/v2/bot/message/reply",
      method: "POST",
      headers: headers,
      body: dataString,
    };

    // Define request
    const request = https.request(webhookOptions, (res) => {
      res.on("data", (d) => {
        process.stdout.write(d);
      });
    });

    // Handle error
    request.on("error", (err) => {
      console.error(err);
    });

    // Send data
    request.write(dataString);
    request.end();
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

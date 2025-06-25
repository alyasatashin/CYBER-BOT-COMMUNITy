const fs = require("fs");
const path = __dirname + "/../../data/teach.json";

module.exports.config = {
  name: "teach",
  version: "1.0.0",
  hasPermission: 0,
  credits: "তুমি",
  description: "প্রশ্নের উত্তর শেখাও",
  commandCategory: "শিক্ষা",
  usages: "teach প্রশ্ন → উত্তর",
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
  if (!args.join(" ").includes("→"))
    return api.sendMessage("❌ ফরম্যাট: teach প্রশ্ন → উত্তর", event.threadID);

  const [q, a] = args.join(" ").split("→").map(s => s.trim());
  if (!q || !a) return api.sendMessage("❌ প্রশ্ন বা উত্তর ফাঁকা রাখা যাবে না!", event.threadID);

  let data = {};
  if (fs.existsSync(path)) {
    data = JSON.parse(fs.readFileSync(path));
  }

  data[q] = a;
  fs.writeFileSync(path, JSON.stringify(data, null, 2));

  return api.sendMessage(`✅ শেখানো হয়েছে:\nপ্রশ্ন: ${q}\nউত্তর: ${a}`, event.threadID);
};

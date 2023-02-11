const getNextDate = (date, day = 1, format = "{y}-{m}-{d}") => {
  if (date) {
    date = date.match(/\d+/g).join("-"); // 格式为2022年09月19日处理
    const nDate = new Date(date);
    nDate.setDate(nDate.getDate() + day);

    const formatObj = {
      y: nDate.getFullYear(),
      m: nDate.getMonth() + 1,
      d: nDate.getDate(),
    };
    return format.replace(/{([ymd])+}/g, (result, key) => {
      const value = formatObj[key];
      return value.toString().padStart(2, "0");
    });
  } else {
    console.log("date格式不正确");
  }
};

module.exports = {
  getNextDate,
};

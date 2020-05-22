const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const covertScore2Array = number => {
  const num = number.toString().split(0,1);
  let array =[];
  for (let i = 0; i<5;i++) {
    if(i<num) {
      array.push(1)
    } else {
      array.push(0)
    }
  }
  return array;
}

const getDouBanData = (url, callBack) => {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      'Content-Type': "application/xml"
    },
    success: function (res) {
      callBack(res.data.subjects);
    }
  })
}

module.exports = {
  formatTime: formatTime,
  covertScore2Array: covertScore2Array,
  getDouBanData: getDouBanData
}

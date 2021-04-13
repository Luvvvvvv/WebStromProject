// var x = new Date();
// document.getElementById("year_today").innerHTML = x.getFullYear() + " 年 " + x.getMonth() + " 月";
// document.getElementById("year_today").style;

// 日历
// 判断平年
const isLeapYear = (year) => {
    return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
};

// 获取每月日期，month[0-11]
const getMonthCount = (year, month) => {
    let arr = [
        31, null, 31, 30,
        31, 30, 31, 31,
        30, 31, 30, 31
    ];
    let count = arr[month] || (isLeapYear(year) ? 29 : 28);
    return Array.from(new Array(count), (item, value) => value + 1);
};

//获取某年1号是周几，getDay()返回0-6为周日-周6
const getWeekday = (year, month) => {
    let date = new Date(year, month, 1);
    return date.getDay();
}

//获得上月天数
const getPreMonthCount = (year, month) => {
    if (month === 0) {
        return getMonthCount(year - 1, 11)
    } else {
        return getMonthCount(year, month - 1);
    }
}
//获得下月天数
const getNextMonthCount = (year, month) => {
    if (month === 1) {
        return getMonthCount(year + 1, 0);
    } else {
        return getMonthCount(year, month + 1);
    }
}

//获取数据
const updateCalendar = (year, month, day) => {
    if (typeof year === 'undefined' && typeof month === 'undefined' && typeof day === 'undefined') {
        let nowDate = new Date();
        year = nowDate.getFullYear();
        month = nowDate.getMonth();
        day = nowDate.getDate();
    }
    // 更新一下顶部的年月显示
    document.getElementById('nowYear').innerHTML = year;
    document.getElementById('nowMonth').innerHTML = month + 1;
    document.getElementById('nowDate').innerHTML = day;
    // 生成日历数据，上个月剩下的的 x 天 + 当月的 28（平年的2月）或者29（闰年的2月）或者30或者31天 + 下个月的 y 天 = 42
    let res = [];
    let currentMonth = getMonthCount(year, month);
    let preMonth = getPreMonthCount(year, month);
    let nextMonth = getNextMonthCount(year, month);
    let whereMonday = getWeekday(year, month);
    if (whereMonday === 0) {
        whereMonday = 7
    }
    let preArr = preMonth.slice(-1 * whereMonday)
    let nextArr = nextMonth.slice(0, 42 - currentMonth.length - whereMonday);
    res = [].concat(preArr, currentMonth, nextArr);
    let hadDom = document.getElementsByClassName('date-item');
    if (hadDom && hadDom.length) {
        let domArr = document.getElementsByClassName('date-item');
        for (let i = 0; i < domArr.length; i++) {
            domArr[i].innerHTML = res.shift();
        }
    } else {
        let str = '';
        for (let i = 0; i < 6; i++) {
            str += '<div class="date-line">';
            for (let j = 0; j < 7; j++) {
                str += `<div class='date-item'>${res.shift()}</div>`;
                if (j === 6) {
                    str += '</div>';
                }
            }
        }
        document.getElementById('dateWrap').innerHTML = str;
    }
};

updateCalendar();

// 添加上一月，下一月事件
let oPreButton = document.getElementById('preMonth');
let oNextButton = document.getElementById('nextMonth');
oPreButton.addEventListener('click', function () {
    let currentYear = +document.getElementById('nowYear').textContent;
    let currentMonth = +document.getElementById('nowMonth').textContent - 1;
    let currentDate = +document.getElementById('nowDate').textContent;
    if (currentMonth === 0) {
        updateCalendar(currentYear - 1, 11, currentDate);
    } else {
        updateCalendar(currentYear, currentMonth - 1, currentDate);
    }
});
oNextButton.addEventListener('click', function () {
    let currentYear = +document.getElementById('nowYear').textContent;
    let currentMonth = +document.getElementById('nowMonth').textContent - 1;
    let currentDate = +document.getElementById('nowDate').textContent;
    if (currentMonth === 11) {
        updateCalendar(currentYear + 1, 0, currentDate);
    } else {
        updateCalendar(currentYear, currentMonth + 1, currentDate);
    }
});

//为每个日期添加点击事件



//dayInfo dayNum
var dayNumber = new Date();
var dayNum=dayNumber.getDate();
    document.getElementById("dayNum").innerHTML = day;
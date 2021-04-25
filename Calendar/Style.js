/*是否是闰年*/
function leapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/*获取一个月有多少天*/
function getMonthLength(year, month) {

    if (month === 2) {
        if (leapYear(year)) {
            return 28;
        } else {
            return 29;
        }
    }

    // 前七个月偶数是小月 后5个月偶数是大月
    if ((month < 8 && month % 2 === 0) || (month > 7 && month % 2 !== 0)) { // 小月
        return 30;
    } else { // 大月
        return 31;
    }
}

/*获取第一天是星期几*/
function getFistDayWeekInMonth(year, month) {

    let date = new Date();
    date.setFullYear(year);
    date.setMonth(month - 1);
    date.setDate(1);

    return date.getDay() + 1;
}

function setCalendar(year, month) {

    let calender = document.getElementById('calendar_day');
    calender.innerHTML = '';

    // 是否显示今天
    let now = new Date();
    let thisYear = now.getFullYear();
    let thisMonth = now.getMonth() + 1;
    let thisDay = now.getDate();
    let showToday = thisYear === year && month === thisMonth;

    const weeks = 6;
    const weekDay = 7;

    let fistDayWeek = getFistDayWeekInMonth(year, month);
    let monthLength = getMonthLength(year, month);
    let singleDayDiv;
    let singleDayDivText;
    let loopDay = -fistDayWeek + 2;

    for (let i = 0; i < weeks; i++) {
        for (let j = 0; j < weekDay; j++) {
            if ((i === 0 && j < fistDayWeek - 1) || loopDay > monthLength) {
                if (i > 0 && j === 0) {
                    break;
                }
                singleDayDivText = document.createElement('br');
            } else {
                singleDayDivText = document.createTextNode(loopDay);
            }
            // 创建单天div
            singleDayDiv = document.createElement('div');
            singleDayDiv.appendChild(singleDayDivText);
            if (showToday && thisDay === loopDay) {
                singleDayDiv.className = 'dateItem today_div';
            } else {
                singleDayDiv.className = 'dateItem';
            }

            calender.appendChild(singleDayDiv);
            loopDay++;
        }
    }

}

function showLastMonth() {
    let text = document.getElementById('current_month').innerHTML;
    let monthYearArray = text.split('年');
    let currentMonth = Number(monthYearArray[1]);
    let currentYear = Number(monthYearArray[0]);
    // 如果是1月 则要进入到去年的12月
    if (currentMonth === 1) {
        currentYear--;
        currentMonth = 12;
    } else {
        currentMonth--;
    }
    setCalendar(currentYear, currentMonth);
    document.getElementById('current_month').innerHTML = currentYear + '年 ' + currentMonth;
}

function showNextMonth() {
    let text = document.getElementById('current_month').innerHTML;
    let monthYearArray = text.split('年');
    let currentMonth = Number(monthYearArray[1]);
    let currentYear = Number(monthYearArray[0]);
    // 如果是12月 则要进入到明年的1月
    if (currentMonth === 12) {
        currentYear++;
        currentMonth = 1;
    } else {
        currentMonth++;
    }
    setCalendar(currentYear, currentMonth);
    document.getElementById('current_month').innerHTML = currentYear + '年 ' + currentMonth;
}

function addListen2Element() {
    document.getElementById('show_last_month').addEventListener('click', showLastMonth);
    document.getElementById('show_next_month').addEventListener('click', showNextMonth);
    document.getElementById('go_back_today').addEventListener('click', goBackToday);

}

function goBackToday() {
    let text = document.getElementById('current_month').innerHTML;
    let monthYearArray = text.split('年');
    let currentMonth = Number(monthYearArray[1]);
    let currentYear = Number(monthYearArray[0]);
    let currentDay = Number(monthYearArray[0]);

    let now = new Date();
    let thisYear = now.getFullYear();
    let thisMonth = now.getMonth() + 1;
    let thisDay = now.getDate();

    // 如果当前时间和现在时间相同则不从新渲染
    if (thisYear === currentYear && thisMonth === currentMonth && thisDay === currentDay) {
        return;
    }
    setCalendar(thisYear, thisMonth);
    document.getElementById('current_month').innerHTML = thisYear + '年 ' + thisMonth;
}

function setThisMonthCalendar() {
    let nowTime = new Date();
    let year = nowTime.getFullYear();
    let month = nowTime.getMonth() + 1;

    setCalendar(year, month);
    document.getElementById('current_month').innerHTML = year + '年 ' + month;
}

window.onload = function () {

    addListen2Element();
    setThisMonthCalendar();

    // 日历点击事件
    $('div').click(function () {
        $('.dateItem').click(function () {
            $('div').click(function () {
                $('.dateItem').click(function () {
                    $(this).addClass('selected');
                    $(this).siblings('div').removeClass('selected');
                });
            });
        });
    });

    $('.today_div').addClass('selected');
    $('#go_back_today').click(function () {
        $('.today_div').addClass('selected');
    });

    setInterval(function () {
        var dateSelected = $('.selected').text();
        document.getElementById('dayNum').innerHTML = dateSelected;

        // var nowTime1 = new Date();
        // var daySelected = nowTime1.getDay();
        // arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        // document.getElementById('weekString').innerHTML = arr[daySelected];

    }, 200);


    // weather
    var nowTimes = new Date();
    var nowMonth = nowTimes.getMonth();
    var nowDate = nowTimes.getDate();
    document.querySelector('.todayText').innerHTML = nowMonth + 1 + '月' + nowDate + '日';









    //滑块移动
    // var startX = 0;
    // var x = 0;
    // var div = document.querySelector('.carousel')
    // div.addEventListener("touchstart", function (event) {
    //     startX = event.targetTouches[0].pageX;
    //     x = div.offsetLeft;
    // });

    // div.addEventListener("touchmove", function (event) {
    //     var moveX = event.targetTouches[0].pageX - startX;
    //     div.style.left = x + moveX + 'px';
    //     event.preventDefault();
    // });

    //--------------//


    // div.addEventListener("touchstart", function (event) {
    //     startX = event.targetTouches[0].pageX;
    // });

    // var index = 0;
    // var moveWidth = div.offsetWidth;
    // div.addEventListener("touchstart", function (event) {
    //     startX = event.targetTouches[0].pageX;
    //     var translatex = -index * moveWidth + x;
    //     div.style.transition = 'none';
    //     div.style.transform = 'translateX(' + translatex + 'px)';
    // });


    // div.addEventListener("touchend", function (event) {
    //     if (Math.abs(moveX) > 50) {
    //         if (moveX > 0) {
    //             index--;
    //         } else {
    //             index++;
    //         }
    //     }
    // });

};
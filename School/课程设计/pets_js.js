
//下拉框设置
function change(myid, mode) {
    document.getElementById(myid).style.display = mode;
    if (mode == 'block') {
        document.getElementById(myid).style.border = "1px solid #eee";
        document.getElementById(myid).parentNode.style.backgroundColor = "#fff";
        document.getElementById(myid).parentNode.style.border = "1px solid #eee";
    } else {
        document.getElementById(myid).parentNode.style.backgroundColor = "";
        document.getElementById(myid).parentNode.style.border = "";
    }
}


//functions to return current date time of the caller in YYYY-MM-DD HH24:MI:SS format
export function getDateStr() {
    const curdate = new Date();
    return curdate.getFullYear() + "-" +
        ("00" + (curdate.getMonth() + 1)).slice(-2) + "-" +
        ("00" + curdate.getDate()).slice(-2) + " " +
        ("00" + curdate.getHours()).slice(-2) + ":" +
        ("00" + curdate.getMinutes()).slice(-2) + ":" +
        ("00" + curdate.getSeconds()).slice(-2);
}
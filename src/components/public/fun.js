export default {
	install(Vue, options) {
		// 时间
    	Vue.prototype.time = function(timeStr, isFixed) {
    		// 系统时间、时间戳等
    		var nowDate = new Date();
    		var date = new Date(timeStr);
    		var tim1 = nowDate.getTime();
    		var tim2 = date.getTime();
    		var min = (tim1 - tim2) / 1000 / 60;
    		var hou = min / 60;

			// 具体日期
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			if (month < 10) {
				month = "0" + month;
			}
			var day = date.getDate();
			if (day < 10) {
				day = "0" + day;
			}
			var hour = date.getHours();
			if (hour < 10) {
				hour = "0" + hour;
			}
			var Minutes = date.getMinutes();
			if (Minutes < 10) {
				Minutes = "0" + Minutes;
			}
			var Seconds = date.getSeconds();
			if (Seconds < 10) {
				Seconds = "0" + Seconds;
			}

			// 判断时间区间
			var time = "";
			if (min <= 5) {
				time = "刚刚";
			} else if (min > 5 && min < 60) {
				time = Math.floor(min) + "分钟前";
			} else if (min >= 60 && hou < 24) {
				time = Math.floor(hou) + "小时前";
			} else {
				time = year + '-' + month + '-' + day + ' ' + hour + ':' + Minutes;
			}

			if (isFixed == 1) {
				time = year + '-' + month + '-' + day + ' ' + '00:00:00';
			}

			return time;
    	}

    	// 评论个数
    	Vue.prototype.commontNum = function(num) {
    		var intNum = parseInt(num)
    		if (intNum > 9999) {
    			var temp = intNum / 10000;
    			var temp1 = parseInt(temp * 10) / 10;
    			var temp2 = Math.floor(temp);
    			if (temp1 > temp2) {
    				return temp1 + "w";
    			}
    			return temp2 + "w";
    		}
    		return intNum;
    	}
    }
}

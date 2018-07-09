import $ from '../public/jquery'
import sha from '../public/request'

export default {
	install(Vue, options) {
		Vue.prototype.ajax = function({url, method, params, isKeep, success, error}) {
			var that = this;

			if (isKeep) {
				that.$Indicator.open();
			}

			var now = new Date().getTime();
			var appid = 'A6062247577920';
			var apptoken = '3ECCF31B-5B2A-93C6-FDB8-1DBD18C86C9D';
			var appKey = sha.hex_sha1(appid + "UZ" + apptoken + "UZ" + now) + "." + now;
			var appendUrl = "https://d.apicloud.com/mcm/api/" + url;

			var dic = {
				"url" : appendUrl,
				"method" : method,
				"cache" : false,
				"headers" : {
					"X-APICloud-AppId" : appid,
					"X-APICloud-AppKey" : appKey
				},
				success:function(data) {
					that.$Indicator.close();
					if (success) {
						success(data)
					}
				},
				error:function(errorData) {
					that.$Indicator.close();
					if (error) {
						error(errorData)
					}
				}
			};

			if (params) {
				for (var key in params) {
					dic[key] = params[key];
				}
			}

			$.ajax(dic);
		}
	}
}

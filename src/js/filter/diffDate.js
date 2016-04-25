import cnode from '../cnode'

cnode.filter('diffDate', () => {
	return (date) => {
		let diff = (Date.now() - (new Date(date).getTime())) / 1000
		switch(true) {
		case diff < 0:
			return '现在'
		case (diff/=60) < 1:
			return parseInt(diff*60) + ' 秒以前'
		case (diff/=60) < 1: // eslint-disable-line no-duplicate-case
			return parseInt(diff*60) + ' 分钟以前'
		case (diff/=24) < 1:
			return parseInt(diff*24) + ' 小时以前'
		case (diff/=30) < 1:
			return parseInt(diff*30) + ' 天以前'
		case (diff/=12) < 1:
			return parseInt(diff*12) + ' 月以前'
		default:
			return (parseInt(diff) || 0) + ' 年以前'
		}
	}
})

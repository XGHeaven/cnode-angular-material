import cnode from '../cnode'

const tabName = new Map([
	['share', '分享'],
	['good', '精华'],
	['ask', '问答'],
	['job', '招聘'],
	['top', '置顶'],
	['unknow', '未知']
])

cnode.constant('tabName', tabName)
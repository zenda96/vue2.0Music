/*
* @Author: zenda
* @Email: 1606726646@qq.com
* @Description: Ψ(^._.^)Ψ  have a nice day~~~
* @Date:               2017-07-05 16:04:40
* @Last Modified by:   zenda96
* @Last Modified time: 2017-07-05 17:14:06
*/
export function addClass(el,className){
	
	if(hasClass(el,className)){
		return
	}
	let newClass = el.className.split(' ')
	newClass.push(className)
	el.className = newClass.join(' ')
}

export function hasClass(el,className){
	let reg = new RegExp('(^|\\s)' + el.className + '(\\s|$)')
	return reg.test(className)
}
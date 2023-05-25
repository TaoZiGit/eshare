export const emailRegex = (email) => {
	const emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	return emailRegex.test(email);
}
export const reqextname = (fileName) => {
	const extName = fileName.match(/\.([^.]+)$/)[1];
	return extName;
}

export const PhoneRegex = (phone) => {
	const emailRegex = /^1[3-9]\d{9}$/;
	return emailRegex.test(phone);
}
const Phonevalidate = (phone) => {
	const result = {
		valid: false,
		message: ''
	};
	const num = Number(phone);
	if (isNaN(num)) {
		result.message = '输入不是数字';
		return result;
	}
	const str = num.toString();
	if (!PhoneRegex(str)) {
		result.message = '输入不是电话号码';
		return result;
	}
	result.valid = true;
	return result;
}
const emailvalidate = (email) => {
	const result = {
		valid: false,
		message: ''
	};
	if (!emailRegex.test(email)) {
		result.message = '输入不是电子邮箱';
		return result;
	}
	result.valid = true;
	return result;
}
const addressvalidate=(address)=>{
	const result = {
		valid: false,
		message: ''
	};
	if(address.length>30){
		result.message = '地址不能超过30个字符！';
		return result;
	}
	result.valid = true;
	return result;
}
const descriptionvalidate=(value)=>{
	const result = {
		valid: false,
		message: ''
	};
	if(value.length>30){
		result.message = '简介不能超过30个字符！';
		return result;
	}
	result.valid = true;
	return result;
}
const worknumvalidate=(value)=>{
	const result = {
		valid: false,
		message: ''
	};
	const num = Number(value);
	if (isNaN(num)) {
		result.message = '输入不是数字';
		return result;
	}
	result.valid = true;
	return result;
}
const agevalidate=(value)=>{
	const result = {
		valid: false,
		message: ''
	};
	const num = Number(value);
	if (isNaN(num)) {
		result.message = '输入不是数字';
		return result;
	}
	result.valid = true;
	return result;
}
const namevalidate=(value)=>{
	const result = {
		valid: false,
		message: ''
	};
	if(value.length>20){
		result.message = '名字不能超过20个字符！';
		return result;
	}
	result.valid = true;
	return result;
}

const validate = {
	name:namevalidate,
	phone: Phonevalidate,
	email: emailvalidate,
	address: addressvalidate,
	worknum: worknumvalidate,
	age: agevalidate,
	description: descriptionvalidate,
}
export const AlterIssueRegex = (input) => {
	for (let key in input) {
		const validator = validate[key];
		if(!validator) continue;
		return validator(input[key]);
	}
}

export const verification = (input) => {
	console.log(input.price)
	if(!input.title) return {valid: false,message: '标题不能为空'};
	if(!input.content) return {valid: false,message: '内容不能为空'};
	if(!input.price) return {valid: false,message: '价格不能为0'};
	if(input.type){
		if(!input.location) return {valid: false,message: '地址不能为空'};
		if(!input.num) return {valid: false,message: '数量不能为0'};
	}
	else{
		if(!input.url) return {valid: false,message: '文件不能为空'};
	}
	return {valid: true,message: ''};
}

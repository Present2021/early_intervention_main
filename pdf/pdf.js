
var peronal_data = {
    "applicant": {
      "full_name": "王大明",
      "phone": "0912345678",
      "relation_to_child": "父親"
    },
    "child": {
      "full_name": "王小明",
      "gender": "男",
      "birthdate": "2010-01-01",
      "household_address": "台南市中西區中正路一段100號",
      "contact_address": "台南市中西區中正路一段100號",
      "national_id_number": "A123456789",
      "identities": ["疑似發展遲緩", "低收入戶"],
      "allowance_expired_on": "2025-06-25"
    },
    "postal_bank_account": {
      "account_name": "王大明",
      "office_code": "1234567",
      "account_code_number": "7654321",
      "national_id_number": "A123456789"
    },
    "household_certificate_copies_urls": ["url1", "url2"],
    "joint_evaluation_report_copies_urls": ["url1", "url2"],
    "diagnosis_certificate_copies_urls": ["url1", "url2"],
    "postal_passbook_cover_copy_url": "url"
  };

  var applications_month_data = {
	"data": [
		{
			"month": "2024-06",
			"transportation_count": 2,
			"self_pay_programs_total": 1600,
			"self_pay_programs": [
				{ "date": "2024-06-02", "amount": 800 },
				{ "date": "2024-06-03", "amount": 800 },
			],
			"transportation_document_copy_url": "https://placehold.co/600x400",
			"program_document_copy_url": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
			"program_receipts_urls": [ "https://placehold.co/600x400", "https://placehold.co/600x400" ],
		},
		{
			"month": "2024-07",
			"transportation_count": 2,
			"self_pay_programs_total": 1600,
			"self_pay_programs": [
				{ "date": "2024-07-02", "amount": 800 },
				{ "date": "2024-07-03", "amount": 800 },
			],
			"transportation_document_copy_url": "https://placehold.co/600x400",
			"program_document_copy_url": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
			"program_receipts_urls": [ "https://placehold.co/600x400", "https://placehold.co/600x400" ],
		},
	],
};
  


document.getElementById("applicant_of_name").innerHTML = peronal_data.applicant.full_name + document.getElementById("applicant_of_name").innerHTML;
document.getElementById("relation_to_child").innerHTML = peronal_data.applicant.relation_to_child ;
document.getElementById("phone").innerHTML = peronal_data.applicant.phone ;

document.getElementById("child_of_name").innerHTML = peronal_data.child.full_name ;

document.getElementById("birthdate").innerHTML = peronal_data.child.birthdate ;
document.getElementById("national_id_number").innerHTML = peronal_data.child.national_id_number ;


document.getElementById("household_address").innerHTML = document.getElementById("household_address").innerHTML + peronal_data.child.household_address ;
document.getElementById("contact_address").innerHTML = document.getElementById("contact_address").innerHTML + peronal_data.child.contact_address ;



document.getElementById("account_name").innerHTML = peronal_data.postal_bank_account.account_name ;
document.getElementById("office_code").innerHTML = peronal_data.postal_bank_account.office_code ;
document.getElementById("account_code_number").innerHTML = peronal_data.postal_bank_account.account_code_number ;
document.getElementById("pb_national_id_number").innerHTML = peronal_data.postal_bank_account.national_id_number ;


var init_time = new Date(applications_month_data.data[0].month);
var final_time;
var total_price = 0 ;

for( let i in applications_month_data.data){
    var str = "month_" + i;
    var date = new Date(applications_month_data.data[i].month);

    var mon = date.getMonth()+1;
    document.getElementById(str).innerHTML = mon + "月" ;

    str = "transportation_count_" + i;
    var price = 500;
    var num = applications_month_data.data[i].transportation_count;
    document.getElementById(str).innerHTML = num + " 次 x " + price +" 元，共計 " + num*price + " 元";

    str = "self_pay_programs_total_" + i;
    document.getElementById(str).innerHTML = applications_month_data.data[i].self_pay_programs_total + " 元";

    total_price += price*num + applications_month_data.data[i].self_pay_programs_total;
    final_time = date;
};


var init_time_month = init_time.getMonth() + 1;
var final_time_month = final_time.getMonth() + 1;
document.getElementById("init_result").innerHTML = "初核結果: <br>" + init_time.getFullYear() + "年" + init_time_month + "月至"
                                                    + final_time.getFullYear() + "年" + final_time_month + "月<br>" 
                                                    + "同意補助 " + total_price + " 元";



var gender = { "男生": "□", "女生": "□", "其他": "□" };         

var str = "";
gender[peronal_data.child.gender + "生"] = "■";

for (i in gender){
    if (i!=0) str+= "<br>";
    str += gender[i] + i ;
}

document.getElementById("gender").innerHTML = str;



var identities_arr = {"疑似發展遲緩": "□", "發展遲緩": "□", "身心障礙": "□", "低收入戶": "□","原住民子女(□父□母□其他:________ )": "□", "新住民子女( □父□母□其他___)，國籍：          ": "□"  };
// console.log(peronal_data.child.identities[0]);

for (i in peronal_data.child.identities){
    identities_arr[peronal_data.child.identities[i]] = "■";
}

var str = "";
for (i in identities_arr){
    str += identities_arr[i] + i ;
}
document.getElementById("identities").innerHTML = str;


var applicant_date = new Date();
var month = applicant_date.getMonth() + 1;
var date_str = "申請日期：" + applicant_date.getFullYear() + "年" + month + "月" + applicant_date.getDate() + "日";

document.getElementById("apllicant_date").innerHTML = date_str;


var formObj;$(function(){	formObj = $.toForm.init();	//加载数据	init();	//点击事件	viewMore();		//设置定时器	setInterval(refresh,10000); });function viewClockLog(){     openTab('打卡日志',ctx+'/statistics/clockLog/index.do');		}function viewUnusualLog(){	openTab('异常日志',ctx+'/operationMgr/unusualHandling/index.do');		}function viewMileageFuel(){	openTab("里程能耗统计", ctx+'/statistics/mileageFuel/index.do');}function viewDriverScoreMgr(){	openTab("司机评分", ctx+'/operationMgr/driverScore/index.do');}function viewAccRun(){	openTab('点熄火统计', ctx+'/statistics/accRun/index.do');}function viewAttendanceLog(){	openTab("行程统计", ctx+'//statistics/attendanceLog/index.do');}function viewWeizhang(){	}function viewMaintance(){	openTab('车辆保养',ctx+'/operationMgr/affairMgr/conserveMgr/index.do');		}function viewInsurance(){	openTab('车辆保险',ctx+'/operationMgr/affairMgr/insuranceMgr/index.do');		}function viewExamin(){	openTab('车辆年审',ctx+'/operationMgr/affairMgr/examinedMgr/index.do');		}function viewLicense(){	openTab('司机管理',ctx+'/resourcesManage/driverResources/index.do');		}function openTab(name,url){	window.parent.$.fn.jerichoTab.addTab({         tabFirer: null,         title: name,         closeable: true,         data: {             dataType: 'iframe',             dataLink: url         }     }).showLoader().loadData();     resizeTab();}//点击事件function viewMore(){	$(".moreDetail").click(function(){		var url = $(this).attr("rel_url");   //attr()  获取属性值 		var name = $(this).attr("rel_name");//		formObj.show(url);		openTab(name,url);  	});	}//加载数据function init(){		refresh();	//待办事项	waitting();	//安全趋势	safe();	//能耗趋势	fuel();	//效率趋势	efficiency();	//费用统计	cost();}//今日发车//需要刷新的模块function refresh(){	//今日发车	faChe();	//异常提醒	unusual();	//严重告警	warn();}function faChe(){	$.ajax({		"type" : 'post',		"url" : ctx+ '/home/getFaCheData.do',		"dataType" : "json",		"success" : function(resp) {			if(resp!=null){				if(resp.attendanceCar>0){					$("#faChe_cql").html(resp.attendanceCar.toFixed(2));				}				if(resp.allCar>0){					$("#faChe_all").html(resp.allCar);				}				if(resp.faCheCar>0){					$("#faChe_yf").html(resp.faCheCar);				}				if(resp.notFaCheCar>0){					$("#faChe_wf").html(resp.notFaCheCar);				}				if(resp.stopCar>0){					$("#faChe_ty").html(resp.stopCar);				}			}		}	});}//异常提醒function unusual(){	$.ajax({		"type" : 'post',		"url" : ctx+ '/home/getUnusualData.do',		"dataType" : "json",		"success" : function(resp) {			if(resp!=null){				if(resp.overSpeedHardNum>0){					$("#unusual_overSpeedHardNum").html(resp.overSpeedHardNum);  //严重超速				}				if(resp.overSpeedOftenNum>0){					$("#unusual_overSpeedOftenNum").html(resp.overSpeedOftenNum); //超速频率				}				if(resp.idlingTimeNum>0){					$("#unusual_idlingTimeNum").html(resp.idlingTimeNum); //怠速时长				}				if(resp.overSpeedTimeNum>0){					$("#unusual_overSpeedTimeNum").html(resp.overSpeedTimeNum); //超速时长				}				if(resp.driverClockNum>0){					$("#unusual_driverClockNum").html(resp.driverClockNum); //司机打卡				}				if(resp.continuousAttendNum>0){					$("#unusual_continuousAttendNum").html(resp.continuousAttendNum); //连续出勤				}					if(resp.fuelHightkNum>0){					$("#unusual_fuelHightkNum").html(resp.fuelHightkNum); //能耗偏高				}					if(resp.fuelLowNum>0){					$("#unusual_fuelLowNum").html(resp.fuelLowNum); //能耗偏低				}					if(resp.mileageHightNum>0){					$("#unusual_mileageHightNum").html(resp.mileageHightNum); //里程偏高				}					if(resp.mileageLowNum>0){					$("#unusual_mileageLowNum").html(resp.mileageLowNum); //里程偏低				}					if(resp.ignitionLongNum>0){					$("#unusual_ignitionLongNum").html(resp.ignitionLongNum); //点火时长过多				}					if(resp.ignitionLessNum>0){					$("#unusual_ignitionLessNum").html(resp.ignitionLessNum); //点我时长过少				}				if(resp.vehicleAttendNum>0){					$("#unusual_vehicleAttendNum").html(resp.vehicleAttendNum); //车辆出勤				}					if(resp.driverScoreNum>0){					$("#unusual_driverScoreNum").html(resp.driverScoreNum); //司机得分				}	                                       			}		}	});}//代办事项function waitting(){	$.ajax({		"type" : 'post',		"url" : ctx+ '/home/getWaittingData.do',		"dataType" : "json",		"success" : function(resp) {			if(resp!=null){				if(resp.weizhangNum>0){					$("#waitting_weizhangNum").html(resp.weizhangNum);				}				if(resp.maintanceNum>0){					$("#waitting_maintanceNum").html(resp.maintanceNum);				}				if(resp.insuranceNum>0){					$("#waitting_insuranceNum").html(resp.insuranceNum);				}				if(resp.examinNum>0){					$("#waitting_examinNum").html(resp.examinNum);				}				if(resp.licenseNum>0){					$("#waitting_licenseNum").html(resp.licenseNum);				}			}		}	});}//严重警告function warn(){	$.ajax({		"type" : 'post',		"url" : ctx+ '/home/getWarnList.do',		"dataType" : "json",		"success" : function(resp) {			if(resp!=null&&resp.length>0){				var html = '';				for(var i=0;i<resp.length;i++){					html+='<p><span class="FloatLeft">'+dateFormat(resp[i].MACHINE_TIME,'hh:mm:ss')+resp[i].VEHICLE_CODE+'产生</span><span class="FloatRight"><a class="size"><b class="decoration" onclick="viewTrajectory(\''+ resp[i].VEHICLE_ID + '\',\''+ dateFormat(resp[i].MACHINE_TIME,'yyyy-MM-dd') + '\')">'+resp[i].ALARM_DEC+'</b></a></span></p>';				}				$(".warn_div").html(html);			}		}	});}function viewTrajectory(vehicleId,date){	var url = ctx+'/resourcesManage/historyTrajectory/index.do?vehicleId='+vehicleId+'&today='+date;	openTab('行车轨迹',url);		}//--------------======================Start 驾驶行为趋势(安全分析)======================--------------------//初始化 chart数据 var container2 = null; //暂存比例图数据var container2Categories = null; //暂存分析图数据var container2Data = null; //危险驾驶行为机构热点图 function safe(){//初始化 危险驾驶行为趋势图$('#container2').highcharts({		chart : {			type : 'line'		},		title : {			text : ''		},		xAxis : {			categories : [],			labels : {				rotation : -45,				align : 'right',				style : {					fontSize : '12px',					fontFamily : 'Verdana, sans-serif'				}			}		},		yAxis : {			min:0, // 定义最小值  			title : {				text : '次'			}		},		tooltip : {			valueSuffix : '次'		},		series : []});container2 = $('#container2').highcharts();//加载图表数据loadChartData();}//对图表加载数据function loadChartData() {	var queryDay = "7";	var deptId = ac.deptId;	//console.log(deptId);		$.ajax({		"type" : 'post',		"url" : ctx+ '/topicAnalysis/safetyAnalysis/dangerousDrivingBehavior.do',		"dataType" : "json",		"data" : {			deptId : deptId,			queryDay : queryDay		},		"success" : function(resp) {			container2Categories = resp["container2"]["categories"];			container2Data = resp["container2"]["data"];			createChart("safe");					}	});}//--------------======================END 驾驶行为趋势======================--------------------//--------------======================Start 能耗趋势======================--------------------//初始化 chart数据 var container5 = null; //暂存比例图数据var container5Categories = null; //暂存分析图数据var container5Data = null; //初始化 能耗趋势图function fuel(){ 	$('#container5').highcharts({   //图表插件			chart : {				type : 'line'       //图表类型			},			title : {               //图表标题   				text : ''			},			xAxis : {               //X轴				categories : [],    //X轴标签名称				labels : {					rotation : -45,					align : 'right',					style : {						fontSize : '12px',						fontFamily : 'Verdana, sans-serif'					}				}			},			yAxis : {                //Y轴				min:0,              // 定义最小值  				title : {					text : 'L'				}			},			tooltip : {				valueSuffix : 'L'			},			series : []	});	container5 = $('#container5').highcharts();	//加载图表数据	loadFuelChartData();}//对图表加载数据function loadFuelChartData() {	var queryDay = "7";	var deptId = ac.deptId;		$.ajax({		"type" : 'post',		"url" : ctx+ '/home/sumFuelTrend.do',		"dataType" : "json",		"data" : {			deptId : deptId,			queryDay : queryDay		},		"success" : function(resp) {			container5Categories = resp["container5"]["categories"];//暂存比例图数据			container5Data = resp["container5"]["data"];            //暂存分析图数据			createChart("fuel");		}	});}//--------------======================END 能耗趋势======================--------------------//--------------======================Start 点火时长趋势图(效率趋势)======================--------------------//初始化 chart数据 var container3 = null; //暂存比例图数据var container3Categories = null; //暂存分析图数据var container3Data = null;//总点火时长机构占比图 function efficiency(){	var efficiencyType  =  "driveTime";	var queryDay = "7";	var deptId = ac.deptId;	var yAxisName = "h"; 		//初始化 点火时长趋势图	$('#container3').highcharts({			chart : {				type : 'line'			},			title : {				text : ''			},			xAxis : {				categories : [],				labels : {					rotation : -45,					align : 'right',					style : {						fontSize : '12px',						fontFamily : 'Verdana, sans-serif'					}				}			},			yAxis : {				min:0, // 定义最小值  				title : {					text : yAxisName				}			},			tooltip : {				valueSuffix : yAxisName			},			series : []	});	container3 = $('#container3').highcharts();	//加载图表数据	$.ajax({		"type" : 'post',		"url" : ctx+ '/topicAnalysis/utilizationAnalysis/driverTime.do',		"dataType" : "json",		"data" : {			deptId : deptId,			queryDay : queryDay,			efficiencyType : efficiencyType		},		"success" : function(resp) {			container3Categories = resp["container2"]["categories"];			container3Data = resp["container2"]["data"];			createChart("efficiency");					}	}); }//构造图表function createChart(tabName) {	if("efficiency" == tabName){		if (typeof (container3Data) != "undefined") {			container3.setTitle( {text: '点火时长趋势图' });			//更新趋势图数据			var feeTendencySeries = eval(container3Data);			//clearChart(container3);				$.each(feeTendencySeries, function(n, value) {				container3.addSeries(value, false);			});			container3.xAxis[0].setCategories(eval(container3Categories),true);		}else{			container3.setTitle( {text: '暂无数据' });		}	}else if("safe" == tabName){ 			if (typeof (container2Data) != "undefined") {				container2.setTitle( {text: '驾驶行为趋势' });				//更新趋势图数据				var feeTendencySeries = eval(container2Data);				//clearChart(container2);						$.each(feeTendencySeries, function(n, value) {					container2.addSeries(value, false);				});				container2.xAxis[0].setCategories(eval(container2Categories),true);			}else{				container2.setTitle( {text: '暂无数据' });			}	}else if("fuel" == tabName){		if (typeof (container5Data) != "undefined") {			container5.setTitle( {text: '能耗趋势' });			//更新趋势图数据			var feeTendencySeries = eval(container5Data);			//clearChart(container5);				$.each(feeTendencySeries, function(n, value) {				container5.addSeries(value, false);			});			container5.xAxis[0].setCategories(eval(container5Categories),true);		}else{			container5.setTitle( {text: '暂无数据' });		}}}//--------------======================END 点火时长趋势图======================--------------------//--------------======================Start 费用占比图(费用统计)======================--------------------var container4 =  null;var container4Data = null;//初始化 费用占比图function cost(){	$('#container4').highcharts({		chart : {			plotBackgroundColor : null,			plotBorderWidth : null,			plotShadow : false		},		title : {			text : '费用占比图'		},		tooltip : {			pointFormat : '{series.name}: <b>{point.percentage:.1f}%</b>'		},		plotOptions : {			pie : {				allowPointSelect : true,				cursor : 'pointer',				dataLabels : {					enabled : true,					color : '#000000',					connectorColor : '#000000',					format : '<b>{point.name}</b>: {point.percentage:.1f} %'				}			}		},		series : [ {			type : 'pie',			name : '所占比例',			data : []		} ]	});	container4 = $('#container4').highcharts();	//加载图表数据	loadDBAChartData();}//对图表加载数据 - 费用占比图function loadDBAChartData() {	var queryDay = "7"; 	var deptId = ac.deptId; 		$.ajax({		"type" : 'post',		"url" : ctx+ '/home/feeAccounted.do',		"dataType" : "json",		"data" : {			deptId : deptId,			queryDay : queryDay		},		"success" : function(resp) {			var objArr = eval(resp.pie);//joson对象转数组			container4Data = null;						for(var i=1;i<objArr.length;i++){				if(objArr[i][1]>0){					container4Data = resp["pie"];					break;					}			}				//container4Data = resp["pie"];			createDBAChart();		}	});}//构造图表function createDBAChart() {	if (container4Data == null){		container4.setTitle( {text: '暂无数据' });	}else{		var feePiedata = eval(container4Data);		//更新饼图数据		container4.series[0].update({			data : feePiedata		});	}	//	if (typeof (container4Data) != "undefined") {//		var feePiedata = eval(container4Data);//		//更新饼图数据//		container4.series[0].update({//			data : feePiedata//		});//	}}//--------------======================END 费用占比图======================--------------------
//jQuery Start
$( document ).ready(function() {

	// Render method added to prototype to create a DOM element
	StudyData.prototype.render = function(){
		this.el = $('#study-template')
			// .clone()
			// .attr('id', null)
			// .addClass('study');

		this.el.find('.MR-num').text(this.mRNum);
		this.el.find('.patient-name').text(this.patientName);
		this.el.find('.study-date').text(this.studyDate);
		this.el.find('.study-type').text(this.studyType);
	};

	// ==== Navigation Menu Variables
	var dashboardNav = $('#dashboard');
	var yourPatientsNav = $('#your-patients');
	var submitReferralNav = $('#submit-referral');
	var contactNav = $('#contact');


	//This populates array with storedData and populates drop down so the user can select a patient
	studyArray = storedData;

	if(studyArray !== null){
			select = document.getElementById('select-patient-view');
				for(var i=0 ; i<studyArray.length ; i++){	    
				    select.add(new Option(studyArray[i]['studyDate'] + ' | ' + studyArray[i]['patientName']));
				}
			}

	yourPatientsNav.on('click',function(){

		$('.your-patients-container').show();
		$('.submit-referral-container').hide();
		$('.contact-container').hide();
		$('.welcome-message-container').hide();

	});





	// selecting the patient from the dropdown renders the item and appends it to the DOM
	$('#select-patient-view').on('change', function(){
		var currentPatient = $('#select-patient-view').val();
		var currentStudy = {};
		var today = new Date();
		console.log(today);
		console.log(currentPatient);
		for(var i=0 ; i<studyArray.length ; i++){
			if(currentPatient === studyArray[i]['studyDate'] + ' | ' + studyArray[i]['patientName']){
				currentStudy = new StudyData(studyArray[i]['mRNum'],studyArray[i]['patientName'],studyArray[i]['studyDate'],studyArray[i]['studyType'],studyArray[i]['refPhysician'],studyArray[i]['dateScored'],studyArray[i]['dateRead'],studyArray[i]['dateSent'],studyArray[i]['recommendReturn'],studyArray[i]['consultationRequest'],studyArray[i]['consultationDate']);
				
				currentStudy.render();
				$('#study-template').show();
				$('#study-displayer').append(currentStudy.el); // Note: .el doesn't appear to do anything
				console.log(currentStudy.studyDate);
				
			}
			if(Date.parse(currentStudy.studyDate) < today){
				$('#performed-status').addClass("progress-bar-success");
				$('#performed-status').removeClass("incomplete");

			}
			if(currentStudy.dateScored !== undefined && currentStudy.dateScored !== null && currentStudy.dateScored !== ""){
				$('#scored-status').addClass("progress-bar-success");
				$('#scored-status').removeClass("incomplete");

			}
			if(currentStudy.dateRead !== undefined && currentStudy.dateRead !== null && currentStudy.dateRead !== ""){
				$('#interpreted-status').addClass("progress-bar-success");
				$('#interpreted-status').removeClass("incomplete");

			}
			if(currentStudy.dateSent !== undefined && currentStudy.dateSent !== null && currentStudy.dateSent !== ""){
				$('#sent-status').addClass("progress-bar-success");
				$('#sent-status').removeClass("incomplete");

			}
		$('.progress').show();
		$('.status').show();
		console.log(currentStudy.dateSent);
		console.log(currentStudy.dateScored);
		console.log(currentStudy.dateRead);
		}
		
	});

// ++++ End Document Ready
});


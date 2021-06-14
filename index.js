const memberForm = document.querySelector('.member'), // form 태그
    ul = document.querySelector('ul'), // ul 태그
    li = document.querySelectorAll('li'), // li 태그
    input = document.querySelectorAll('input'), // input 태그들
    saveBtn = input[5], // input 태그의 인덱스로 저장 버튼
    delBtn = input[6], // input 태그의 인덱스로 삭제 버튼
    updateBtn = input[7]; // input 태그의 인덱스로 수정 버튼

let selectLi; // 선택한 회원 li 태그 

let memberList = []; // 회원정보를 저장 하기 위한 배열 선언

/* form input(text)태그 활성화 */
function disabledForm() {
    for(let i = 0; i < 5; i++) {
        memberForm[i].disabled = false;
    }
}

/* form input(text)태그 초기화 */
function resetForm() {
    for(let i = 0; i < 5; i++) {
        memberForm[i].value = '';
    }
}

/* 회원정보 생성자 함수 선언 */
function Member(name, age, birth, tel, address){
    this.name = name; // 이름
    this.age = age; // 나이
    this.birth = birth; // 생년월일
    this.tel = tel; // 전화번호
    this.address = address; // 주소
}

/* 회원 정보 추가시 li태그 생성 */
function membertLiUpdate(member) {
    const li = document.createElement('li'); // li 태그 생성
    li.innerText = member.name; // text 추가
    li.dataset.id = memberList.length - 1; // 추가된 배열의 인덱스를 li태그의 data 속성으로 추가
    ul.appendChild(li); // 해당 li 태그를 ul태그의 자식 요소로 추가
}

/* 회원정보 추가시 */
function saveMember() {

    /* 회원정보중 이름을 입력하지 않으면 경고창 */
    if(memberForm[0].value === '') {
        alert('회원이름을 입력해주세요');
    } else {
        // 회원정보 객체 생성
        var member = new Member(memberForm[0].value, memberForm[1].value, memberForm[2].value, memberForm[3].value, memberForm[4].value); 

        memberList.push(member); // 배열의 객체 추가

        membertLiUpdate(member); // 추가된 회원정보 화면에 출력

        resetForm(); // form 태그 초기화
    }
}

/* 회원정보 수정시 */
function updateMember() {
    selectLi = document.querySelector('.selected'); // 선택 되어진 li태그(회원 정보)

    let index = selectLi.dataset.id; // 해당 li태그의 data-id 속성이 회원 정보 배열의 index 값이므로 해당 값 변수에 초기화.

    memberList[index].name = memberForm[0].value; // 이름
    memberList[index].age = memberForm[1].value;  // 나이
    memberList[index].birth = memberForm[2].value; // 생년월일
    memberList[index].tel = memberForm[3].value; // 전화번호
    memberList[index].address = memberForm[4].value; // 주소

    resetForm(); // form 태그 초기화

    selectLi.innerText = memberList[index].name; // 수정된 회원정보를 기준으로 해당 li태그 초기화
    selectLi.classList.remove('selected'); // 선택한 li 태그 하이라이트 제거

    /* form input(button) 화면에 출력 or 숨기기 */
    saveBtn.classList.remove('hidden');
    updateBtn.classList.add('hidden');
    delBtn.classList.add('hidden');
}

/* 회원 정보 삭제 */
function deleteMember() {
    selectLi = document.querySelector('.selected'); // 선택한 회원정보의 li 태그 가져오기 
    
    memberList.splice(selectLi.dataset.id, 1); // 회원정보를 담고있는 배열에서 선택한 회원 삭제하기

    ul.removeChild(selectLi); // 화면에 출력된 회원 삭제하기
    
    /* 각 li태그의 회원정보에 배열의 인덱스 값을 담고 있는 data-id 속성의 값 초기화 */
    for(let i = 0; i < memberList.length; i++) {
        ul.children[i].dataset.id = i;
    }

    resetForm(); // form 태그 초기화
    disabledForm(); // form 태그 활성화

    /* form input(button) 화면에 출력 or 숨기기 */
    saveBtn.classList.remove('hidden');
    updateBtn.classList.add('hidden');
    delBtn.classList.add('hidden');
}

/* input 버튼 클릭시 이벤트 함수 매개변수로 각 버튼 동작 구분 */
function memberSubmit(type) {
    switch(type) {
        case '저장' :
            saveMember();
            break;
        case '수정' :
            disabledForm(); // form 태그 활성화
            updateBtn.value = '완료';
            break;
        case '삭제' :
            deleteMember();
            break;
        case '완료' :
            updateMember();
            updateBtn.value = '수정';
            break;
    }

}

/* form 태그 submit시 페이지 새로고침 방지 */
function handleSaveBtnClick(event) {
    event.preventDefault();
}

function init() {
    memberForm.addEventListener('submit', handleSaveBtnClick); // form 태그 submit 시 
    
    /* li태그가 동적으로 생성이 되어서 해당 동적 li태그 이벤트 함수 */
    document.addEventListener('click',function(e){
        if(e.target && e.target.localName == 'li'){ // 해당 클릭한 태그가 li 태그 일때만 코드 실행
            
            /* li 태그의 하이라이트 모두 제거 */
            for(let i = 0; i<ul.children.length; i++) {
                ul.children[i].classList.remove('selected');
            }

            /* 선택한 li태그의 클래스추가, 하이라이트 생성 */
            e.target.classList.add('selected');

            /* 선택한 li태그의 회원정보 배열의 인덱스인 data-id 값 가져와서 숫자형으로 형변환 */
            let index = parseInt(e.target.getAttribute('data-id'));

            /* form 태그 비활성화(input type=text 만) */
            for(let i = 0; i < 5; i++) {
                memberForm[i].disabled = true;
            }

            /* 선택한 회원정보를 화면에 표시 */
            memberForm[0].value = memberList[index].name; // 이름
            memberForm[1].value = memberList[index].age;  // 나이
            memberForm[2].value = memberList[index].birth; // 생년월일
            memberForm[3].value = memberList[index].tel; // 전화번호
            memberForm[4].value = memberList[index].address; // 주소
            
            /* form input(button) 화면에 출력 or 숨기기 */
            saveBtn.classList.add('hidden');
            delBtn.classList.remove('hidden');
            updateBtn.classList.remove('hidden');
        }
    });

        /* form 태그 enter키 입력 막기위해 */
        document.memberForm.addEventListener('keydown', function(event) {
            if(event.keyCode === 13) {
                event.preventDefault();
            }
        })
    

    console.log(memberList);
}

init();
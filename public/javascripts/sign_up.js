const signUpBtn = document.getElementById('signUpBtn');

signUpBtn.addEventListener('click', async (event) => {
    const inputID = document.getElementById('inputID').value;
    const inputPwd = document.getElementById('inputPwd').value;
    if (!inputID || !inputPwd) return alert('ID와 비밀번호를 모두 입력해주세요');

    try {
        const response = await fetch('/signUp', {
            method: 'POST',
            body: JSON.stringify({ id: inputID, pwd: inputPwd }),
            headers: { "Content-Type": "application/json" }
        });

        const result = await response.text();
        if (result === '중복') {
            alert('이미 가입한 ID입니다.');
            document.getElementById('inputID').value = '';
            document.getElementById('inputPwd').value = '';
        }
        if (result === '가입') {
            alert('가입을 축하드립니다.');
            window.location.href = '/';
        }
    } catch (err) {
        console.log(err);
    }
});
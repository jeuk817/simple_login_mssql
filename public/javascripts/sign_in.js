const inputID = document.getElementById('inputID');
const inputPwd = document.getElementById('inputPwd');
const signInBtn = document.getElementById('signInBtn');

signInBtn.addEventListener('click', async (event) => {
    const inputIdValue = inputID.value;
    const inputPwdValue = inputPwd.value;
    if (!inputIdValue || !inputPwdValue) return alert('ID와 비밀번호를 모두 입력해주세요');

    try {
        const response = await fetch('/signIn', {
            method: 'POST',
            body: JSON.stringify({ id: inputIdValue, pwd: inputPwdValue }),
            headers: { "Content-Type": "application/json" }
        });
        const result = await response.text();

        if (result === '없음') return alert('ID가 잘못 입력되었습니다.');
        if (result === '틀림') return alert('패스워드가 잘못 입력되었습니다.')
        if (response.redirected) return window.location.href = response.url;
    } catch {
        console.log(err);
    }
});

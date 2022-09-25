const createUser = () => {
    const data = new URLSearchParams();
    data.append('username', document.querySelector('.main-content .cms-section.user #username').value);
    data.append('password', document.querySelector('.main-content .cms-section.user #password').value);
    data.append('role', document.querySelector('.main-content .cms-section.user #role').value);
    data.append('email', document.querySelector('.main-content .cms-section.user #email').value);

    fetch("/api/user", {
        method: "post",
        headers: { 'x-api-key': '766c3500-df40-46f9-adf0-8f537b8963ce' },
        body: data
    })
    .then((res) => {
        fetchUser();
    })
    .catch((err) => { console.log(err); });
}

const fetchUser = () => {
    fetch("/api/users", {
        method: "get",
        headers: { 'x-api-key': '766c3500-df40-46f9-adf0-8f537b8963ce' }
    })
    .then((res) => res.json())
    .then((data) => { 
        data = data.data;
        const table = document.querySelector('.cms-section.user table');
        const tds = document.querySelectorAll('.cms-section.user td');
        tds.forEach(el => el.parentNode.removeChild(el));
        data.forEach((user, i) => {
            const tr = document.createElement('tr');
            // tr.setAttribute('onclick', `window.location='/';`);
            // tr.setAttribute('id', user._id);
            let td = document.createElement('td');
            td.innerText = user.username;
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerText = user.email;
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerText = user.role;
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerText = user.creationTime.slice(0, 19);
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerText = user.modificationTime.slice(0, 19);
            tr.appendChild(td);
            table.appendChild(tr);
        });
    })
    .catch((err) => { console.log(err); });
}

const initUser = () => {
    fetchUser();
}
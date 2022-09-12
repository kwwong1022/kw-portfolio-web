const fetchUser = () => {
    fetch("/user", {
        method: "post",
        body: {}
    })
    .then((res) => res.json())
    .then((data) => { 
        const table = document.querySelector('.cms-section.user table');
        const tds = document.querySelectorAll('.cms-section.user td');
        tds.forEach(el => el.parentNode.removeChild(el));
        data.forEach((user, i) => {
            const tr = document.createElement('tr');
            tr.setAttribute('onclick', `window.location='/';`);
            tr.setAttribute('id', user._id);
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
            td.innerText = user.creationTime;
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerText = user.modificationTime;
            tr.appendChild(td);
            table.appendChild(tr);
        });
    })
    .catch((err) => { console.log(err); });
}

const initUser = () => {
    fetchUser();
}
function getWelcomeTemplate ({name, age, school, createdAt}) {
     const myTemplate = `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다!</h1>
                <hr />
                <div>이름: ${name}</div>
                <div>나이: ${age}</div>
                <div>학교: ${school}</div>
                <div>가입일: ${createdAt}</div>
            </body>
        </html>
    `
    console.log("myTemplate:", myTemplate)
}

const name = "Ian"
const age = 30
const school = "BHS"
const createdAt = "2022-10-05"

getWelcomeTemplate({name, age, school, createdAt})


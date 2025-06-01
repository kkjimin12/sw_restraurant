// 샘플 데이터
const sampleAccount = {
    username: 'admin',
    email: 'hong123@naver.com',
    password: '1234'
};

let accounts = [sampleAccount];

const getAccounts = () => {
    return accounts;
};

const addAccount = (newAccount) => {
    accounts = [...accounts, newAccount];
};

const updateAccounts = (updatedAccounts) => {
    accounts = updatedAccounts;
};

export { addAccount, updateAccounts, getAccounts };
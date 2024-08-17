import { useEffect, useState } from 'react';
import SignUpForm from './SignUpForm';

export default function App() {
    const [userInfo, setUserInfoState] = useState<{
        username: string;
        password: string;
    } | null>(null);

    const setUserInfo = (userInfo: { username: string; password: string } | null) => {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        setUserInfoState(userInfo);
    };

    useEffect(() => {
        try {
            const userInfoToParse = localStorage.getItem('userInfo');
            if (userInfoToParse) setUserInfo(JSON.parse(userInfoToParse));
        } catch {
            // do nothing, maybe log that userInfoToParse is not a valid JSON
        }
    }, []); // useMountEffect

    return (
        <>
            {userInfo ? (
                <div className="welcome">
                    <h1>Welcome back, {userInfo.username}!</h1>
                    <button
                        onClick={() => {
                            setUserInfo(null);
                            localStorage.removeItem('userInfo');
                        }}
                    >
                        Log out
                    </button>
                </div>
            ) : (
                <SignUpForm setUserInfo={setUserInfo} />
            )}
        </>
    );
}

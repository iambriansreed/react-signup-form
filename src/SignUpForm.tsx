import { useState } from 'react';

function cx(...classNames: (string | boolean | undefined)[]) {
    return classNames.filter(Boolean).join(' ');
}

function PasswordField({ name, placeholder }: Pick<HTMLInputElement, 'name' | 'placeholder'>) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="input password">
            <input
                type={showPassword ? 'text' : 'password'}
                id={name}
                name={name}
                placeholder={placeholder}
                required
                autoComplete="off"
            />
            <label role="button" className="show-hide">
                <input
                    type="checkbox"
                    data-id="show-password"
                    onChange={(e) => {
                        setShowPassword(e.target.checked);
                    }}
                />
            </label>
        </div>
    );
}

export default function SignUpForm({
    setUserInfo,
}: {
    setUserInfo: (userInfo: { username: string; password: string }) => void;
}) {
    const [{ password, password2, submitted, username }, setFormData] = useState({
        username: '',
        password: '',
        password2: '',
        submitted: false,
    });

    function handleChange(event: React.FormEvent<HTMLFormElement>) {
        const { name, value } = event.target as HTMLInputElement;
        if (name) setFormData((p) => ({ ...p, [name]: value }));
    }

    function handleSubmit() {
        setFormData((p) => ({ ...p, submitted: true }));

        if (username && password2 && password == password2)
            setUserInfo({
                username: username,
                password: password,
            });
    }

    return (
        <>
            <div className="sign-up-form">
                <form
                    className={cx('form', submitted && 'submitted')}
                    onSubmit={handleSubmit}
                    onChange={handleChange}
                    method="dialog"
                    noValidate
                >
                    <header>
                        <h1>Sign Up</h1>
                    </header>
                    <main>
                        <div className={cx('field', !username && 'error')}>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                required
                                autoComplete="off"
                            />
                            {!username && <p className="error required">Username is required</p>}
                        </div>
                        <div className={cx('field', !password && 'error')}>
                            <label htmlFor="password">Password</label>
                            <PasswordField name="password" placeholder="Create a password" />
                            {!password && <p className="error required">Password is required</p>}
                        </div>
                        <div className={cx('field', (!password2 || password !== password2) && 'error')}>
                            <label htmlFor="password2">Password Confirmation</label>
                            <PasswordField name="password2" placeholder="Confirm password" />
                            {!password2 && (
                                <p className="error required">Password Confirmation is required</p>
                            )}
                            {password !== password2 && (
                                <p className="error mismatch">Passwords do not match</p>
                            )}
                        </div>
                    </main>
                    <footer>
                        <button type="submit">Sign Up</button>
                    </footer>
                </form>
            </div>
        </>
    );
}

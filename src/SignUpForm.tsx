import { useState } from 'react';

const PASSWORD_REGEX = /.{10,}/;
const PASSWORD_REGEX_MESSAGE = 'Password must be greater than 10 characters';

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
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        password2: '',
        submitted: false,
    });

    function handleChange(event: React.FormEvent<HTMLFormElement>) {
        const { name, value } = event.target as HTMLInputElement;
        if (name) setFormData((p) => ({ ...p, [name]: value }));
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        setFormData((p) => ({ ...p, submitted: true }));

        if (
            !formData.username ||
            !formData.password.match(PASSWORD_REGEX) ||
            !formData.password2 ||
            formData.password !== formData.password2
        ) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        setUserInfo({
            username: formData.username,
            password: formData.password,
        });
    }

    return (
        <>
            <div className="sign-up-form">
                <form
                    className="form"
                    onSubmit={handleSubmit}
                    onChange={handleChange}
                    method="dialog"
                    noValidate
                >
                    <header>
                        <h1>Sign Up</h1>
                    </header>
                    <main>
                        <div
                            className={cx(
                                'field',
                                //
                                formData.submitted && !formData.username && 'error required'
                            )}
                        >
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                required
                                autoComplete="off"
                            />
                            {formData.submitted && !formData.username && (
                                <p className="error required">Username is required</p>
                            )}
                        </div>
                        <div
                            className={cx(
                                'field',
                                //
                                formData.submitted && !formData.password && 'error required'
                            )}
                        >
                            <label htmlFor="password">Password</label>
                            <PasswordField name="password" placeholder="Create a password" />
                            {formData.submitted && !formData.password.match(PASSWORD_REGEX) && (
                                <p className="error required">{PASSWORD_REGEX_MESSAGE}</p>
                            )}
                        </div>
                        <div
                            className={cx(
                                'field',
                                formData.submitted && !formData.password2 && 'error required',
                                formData.submitted &&
                                    formData.password !== formData.password2 &&
                                    'error mismatch'
                            )}
                        >
                            <label htmlFor="password2">Password Confirmation</label>
                            <PasswordField name="password2" placeholder="Confirm password" />
                            {formData.submitted && !formData.password2 && (
                                <p className="error required">Password Confirmation is required</p>
                            )}
                            {formData.submitted && formData.password !== formData.password2 && (
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

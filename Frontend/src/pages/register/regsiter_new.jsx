import React, {useState} from "react"

export default Regsiter = () => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

     const handleTermsChange = (e) => {
        setTermsAccepted(e.target.checked);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const handleSubmit = (e) => {
            e.preventDefault();
    
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
    
            if (!termsAccepted) {
                alert('Please accept the terms and conditions');
                return;
            }
    
            // Submit logic here
        };
    };

    return (
        <div className="grid-cols-1">
            <div className="grid-rows-4 ">
                <form className="mt-4 md:mt-8" onSubmit={handleSubmit}>
                    <div className="mb-2 md:mb-4">
                        <label style={{ textAlign: 'initial' }} className="block mb-1 text-sm font-semibold text-gray-700 md:text-base md:mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded md:text-base focus:outline-none focus:shadow-outline"
                            id="username" type="text" placeholder="Enter your username" />
                    </div>
                    <div className="mb-2 md:mb-4">
                        <label style={{ textAlign: 'initial' }} className="block mb-1 text-sm font-semibold text-gray-700 md:text-base md:mb-2" htmlFor="firstName">
                            Full Name
                        </label>
                        <input
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded md:text-base focus:outline-none focus:shadow-outline"
                            id="firstName" type="text" placeholder="Enter your full name" />
                    </div>
                    <div className="mb-2 md:mb-4">
                        <label style={{ textAlign: 'initial' }} className="block mb-1 text-sm font-semibold text-gray-700 md:text-base md:mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded md:text-base focus:outline-none focus:shadow-outline"
                            id="email" type="email" placeholder="Enter your email address" />
                    </div>
                    <div className="mb-2 md:mb-4">
                        <label style={{ textAlign: 'initial' }} className="block mb-1 text-sm font-semibold text-gray-700 md:text-base md:mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded md:text-base md:mb-3 focus:outline-none focus:shadow-outline"
                            id="password" type="password" placeholder="Enter your password" onChange={handlePasswordChange} />
                    </div>
                    <div className="mb-2 md:mb-4">
                        <label style={{ textAlign: 'initial' }} className="block mb-1 text-sm font-semibold text-gray-700 md:text-base md:mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            className="w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded md:text-base md:mb-3 focus:outline-none focus:shadow-outline"
                            id="confirmPassword" type="password" placeholder="Confirm your password" onChange={handleConfirmPasswordChange} />
                    </div>
                    <div className="mb-4 md:mb-6">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-blue-600"
                                checked={termsAccepted}
                                onChange={handleTermsChange}
                            />
                            <span className="ml-2 text-sm text-gray-700">I accept the <a href="/terms" className="underline">terms and conditions</a></span>
                        </label>
                    </div>
                    <div className="mb-4 md:mb-6">
                        <button
                            className="px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700 md:py-3 md:px-6 focus:outline-none focus:shadow-outline md:text-base">
                            Signup
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}
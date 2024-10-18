// import logo from './logo.svg';
import './App.css';
import logo from './6673098-200.png';
import bg from './favpng_warehouse-cartoon.png';
function App() {
    return (
        <div className="container">
            <div className="left-panel">
                <img 
                    src={bg}
                    alt="Illustration" 
                    className="illustration" 
                />
            </div>
            <div className="right-panel">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <h2>Sign Up!</h2>
                <form className="form">
                    <div className="form-group">
                        <label htmlFor="firstName">
                            First Name<span className="required">*</span>
                        </label>
                        <input type="text" id="firstName" placeholder="Enter your name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" placeholder="Last name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">
                            Email<span className="required">*</span>
                        </label>
                        <input type="email" id="email" placeholder="Enter your email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">
                            Phone No.<span className="required">*</span>
                        </label>
                        <input type="tel" id="phone" placeholder="Phone no." required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">
                            Password<span className="required">*</span>
                        </label>
                        <input type="password" id="password" placeholder="Enter your password" required />
                    </div>
                    <button type="submit" className="submit-btn">Create Account</button>
                    <p className="login-link">
                        <a href="/login">Already have an account? Log in</a>
                    </p>
                </form>
            </div>
        </div>
    );
};



export default App;

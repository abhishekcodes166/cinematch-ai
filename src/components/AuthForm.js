import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '../components/Firebase';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signInWithPopup,
    sendPasswordResetEmail,
    onAuthStateChanged
} from 'firebase/auth';
import movieBuff from '../utiles/download (1).jpg';
import moodWatcher from '../utiles/images (2).jpg';
import genreExplorer from '../utiles/images (3).jpg';
import { useNavigate } from 'react-router-dom';

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-black/40 p-8 rounded-xl backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300 border border-gray-800">
        <div className="text-red-600 text-4xl mb-4">{icon}</div>
        <h3 className="text-white text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);

const PersonaCard = ({ title, description, imageSrc }) => (
    <div className="bg-black/40 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-800">
        <div className="h-48 overflow-hidden relative">
            <div className="w-full h-full bg-gradient-to-b from-transparent via-black/60 to-black absolute z-10"></div>
            <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="p-6">
            <h3 className="text-red-600 text-xl font-semibold mb-3">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
    </div>
);

const AuthForm = () => {
    const navigate = useNavigate();
    const [isSignIn, setIsSignIn] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const getReadableErrorMessage = (error) => {
        switch (error.code) {
            case 'auth/user-not-found':
                return 'No account found with this email address';
            case 'auth/wrong-password':
                return 'Incorrect password';
            case 'auth/invalid-email':
                return 'Please enter a valid email address';
            case 'auth/weak-password':
                return 'Password should be at least 6 characters';
            case 'auth/email-already-in-use':
                return 'An account with this email already exists';
            case 'auth/network-request-failed':
                return 'Network error. Please check your internet connection';
            case 'auth/too-many-requests':
                return 'Too many attempts. Please try again later';
            default:
                return error.message;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            if (showResetPassword) {
                await sendPasswordResetEmail(auth, formData.email);
                setSuccess('Password reset email sent! Please check your inbox.');
                setShowResetPassword(false);
            } else if (isSignIn) {
                await signInWithEmailAndPassword(auth, formData.email, formData.password);
                setSuccess('Successfully signed in!');
                
            } else {
                await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                setSuccess('Account created successfully!');
                
            }
        } catch (err) {
            setError(getReadableErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError('');
        setSuccess('');
        setLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
            setSuccess('Successfully signed in with Google!');
            
        } catch (err) {
            setError(getReadableErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen w-full bg-[#141414]">
            {/* Auth Form Section */}
            <div className="w-full flex items-center justify-center p-6 min-h-screen bg-gradient-to-b from-black via-black/90 to-[#141414]">
                <div className="w-full max-w-md space-y-8 p-8 rounded-xl bg-black/60 backdrop-blur-md">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-white mb-2">
                            CineMatch AI
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Experience the future of film recommendations
                        </p>
                        <div className="inline-block px-4 py-1 bg-red-600 rounded-md text-sm font-medium text-white mt-4">
                            {showResetPassword ? 'Reset Password' : isSignIn ? 'Welcome Back' : 'Join Now'}
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-900/20 text-red-500 p-4 rounded-lg mb-6 text-center border border-red-900">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-900/20 text-green-500 p-4 rounded-lg mb-6 text-center border border-green-900">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                        {!isSignIn && !showResetPassword && (
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-md bg-[#333333] border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                        )}
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-md bg-[#333333] border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                                required
                            />
                        </div>
                        {!showResetPassword && (
                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-md bg-[#333333] border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 px-4 rounded-md font-medium text-white 
                                ${loading 
                                    ? 'bg-gray-600 cursor-not-allowed' 
                                    : 'bg-red-600 hover:bg-red-700'
                                } transition-all duration-200`}
                        >
                            {loading ? 'Processing...' : 
                             showResetPassword ? 'Send Reset Link' :
                             isSignIn ? 'Sign In' : 'Create Account'}
                        </button>

                        {!showResetPassword && (
                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                disabled={loading}
                                className="w-full py-3 px-4 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Continue with Google
                            </button>
                        )}

                        <div className="text-center mt-6 space-y-2">
                            {!showResetPassword && (
                                <p className="text-gray-400">
                                    {isSignIn ? "Don't have an account?" : "Already have an account?"}{' '}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsSignIn(!isSignIn);
                                            setError('');
                                            setSuccess('');
                                        }}
                                        className="text-white hover:text-red-600 font-medium transition-colors"
                                    >
                                        {isSignIn ? 'Sign up' : 'Sign in'}
                                    </button>
                                </p>
                            )}
                            <p className="text-gray-400">
                                {showResetPassword ? (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowResetPassword(false);
                                            setError('');
                                            setSuccess('');
                                        }}
                                        className="text-white hover:text-red-600 font-medium transition-colors"
                                    >
                                        Back to Sign In
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowResetPassword(true);
                                            setError('');
                                            setSuccess('');
                                        }}
                                        className="text-white hover:text-red-600 font-medium transition-colors"
                                    >
                                        Forgot Password?
                                    </button>
                                )}
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            {/* Why Choose CineMatch AI Section */}
            <div className="w-full px-6 py-20 bg-[#141414]">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
                        Why Choose CineMatch AI?
                    </h2>
                    <p className="text-gray-400 text-center text-lg mb-12">
                        Elevate your movie-watching experience with our cutting-edge AI technology.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon="🧠"
                            title="Deep Learning"
                            description="Our AI continuously learns from your interactions, refining its understanding of your unique preferences over time."
                        />
                        <FeatureCard
                            icon="📊"
                            title="Advanced Analytics"
                            description="We analyze thousands of data points for each movie, ensuring precise matches to your taste."
                        />
                        <FeatureCard
                            icon="❤️"
                            title="Emotional Intelligence"
                            description="CineMatch AI doesn't just look at genres – it understands the emotional journey each film offers."
                        />
                    </div>
                </div>
            </div>

            {/* How CineMatch AI Works Section */}
            <div className="w-full px-6 py-20 bg-black">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
                        How CineMatch AI Works For You
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        <PersonaCard
                            title="The Movie Buff"
                            description="Sarah loves classic films but struggles to find modern movies that capture that same magic. CineMatch AI analyzes the pacing, cinematography, and themes of her favorite classics to recommend contemporary films that resonate with her taste."
                            imageSrc={movieBuff}
                        />
                        <PersonaCard
                            title="The Mood Watcher"
                            description="Mike's movie preferences change based on his mood. CineMatch AI tracks the emotional tone of his recent watches and time of day to suggest the perfect film for his current state of mind, whether he needs a pick-me-up or a thoughtful drama."
                            imageSrc={moodWatcher}
                        />
                        <PersonaCard
                            title="The Genre Explorer"
                            description="Lisa wants to broaden her horizons beyond her usual rom-coms. CineMatch AI gradually introduces her to new genres by recommending films that blend familiar elements with new styles, expanding her cinematic palette."
                            imageSrc={genreExplorer}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm; 
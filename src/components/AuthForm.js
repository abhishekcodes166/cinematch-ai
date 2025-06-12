import React, { useState } from 'react';
import { auth } from './Firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import movieBuff from '../utiles/download (1).jpg';
import moodWatcher from '../utiles/images (2).jpg';
import genreExplorer from '../utiles/images (3).jpg';

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
    const [isSignIn, setIsSignIn] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isSignIn) {
                await signInWithEmailAndPassword(auth, formData.email, formData.password);
            } else {
                await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            }
        } catch (err) {
            setError(err.message);
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
                            {isSignIn ? 'Welcome Back' : 'Join Now'}
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-900/20 text-red-500 p-4 rounded-lg mb-6 text-center border border-red-900">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                        {!isSignIn && (
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

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 px-4 rounded-md font-medium text-white 
                                ${loading 
                                    ? 'bg-gray-600 cursor-not-allowed' 
                                    : 'bg-red-600 hover:bg-red-700'
                                } transition-all duration-200`}
                        >
                            {loading ? 'Processing...' : (isSignIn ? 'Sign In' : 'Create Account')}
                        </button>

                        <div className="text-center mt-6">
                            <p className="text-gray-400">
                                {isSignIn ? "Don't have an account?" : "Already have an account?"}{' '}
                                <button
                                    type="button"
                                    onClick={() => setIsSignIn(!isSignIn)}
                                    className="text-white hover:text-red-600 font-medium transition-colors"
                                >
                                    {isSignIn ? 'Sign up' : 'Sign in'}
                                </button>
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